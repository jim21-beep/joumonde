import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, x-client-info, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
});

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

const deliveredStatuses = ['Geliefert', 'delivered', 'Delivered'];
const forbiddenTerms = (Deno.env.get('REVIEW_BLOCKED_TERMS') ?? 'arschloch|hurensohn|scheisse|scheiß|wixxer|fuck|shit|asshole|bitch|merde|putain|connard|salope')
  .split('|')
  .map(term => term.trim().normalize('NFKC').toLocaleLowerCase())
  .filter(Boolean);

function hasBlockedContent(value: string): boolean {
  const normalized = value.normalize('NFKC').toLocaleLowerCase();
  if (/(https?:\/\/|www\.|[\w.+-]+@[\w.-]+\.[a-z]{2,})/i.test(normalized)) return true;
  if (/(.)\1{7,}/u.test(normalized)) return true;
  return forbiddenTerms.some(term => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, 'u').test(normalized);
  });
}

async function authenticate(request: Request) {
  const token = request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!token || !supabase) return null;
  const { data, error } = await supabase.auth.getUser(token);
  return error ? null : data.user;
}

async function eligibleOrders(userId: string, productName: string) {
  if (!supabase) throw new Error('service_unavailable');

  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('id')
    .eq('user_id', userId)
    .eq('payment_status', 'paid')
    .not('provider_payment_id', 'is', null)
    .in('status', deliveredStatuses)
    .order('created_at', { ascending: false });
  if (ordersError) throw new Error('order_lookup_failed');
  if (!orders?.length) return [];

  const orderIds = orders.map(order => order.id);
  const [{ data: items, error: itemsError }, { data: existing, error: reviewsError }] = await Promise.all([
    supabase.from('order_items').select('order_id').in('order_id', orderIds).eq('product_name', productName),
    supabase.from('product_reviews').select('order_id').eq('user_id', userId).eq('product_name', productName),
  ]);
  if (itemsError || reviewsError) throw new Error('purchase_check_failed');

  const reviewedOrderIds = new Set((existing ?? []).map(review => review.order_id));
  return [...new Set((items ?? []).map(item => item.order_id))]
    .filter(orderId => !reviewedOrderIds.has(orderId));
}

serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!supabase) return json({ error: 'service_unavailable' }, 503);

  try {
    const body = await request.json();
    const action = body?.action;
    const productName = typeof body?.productName === 'string' ? body.productName.trim() : '';
    if (!productName || productName.length > 120) return json({ error: 'invalid_product' }, 400);

    if (action === 'list') {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('id, display_name, rating, title, review_text, created_at')
        .eq('product_name', productName)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) return json({ error: 'reviews_unavailable' }, 503);
      return json({ reviews: data ?? [] });
    }

    const user = await authenticate(request);
    if (!user) return json({ error: 'sign_in_required' }, 401);

    if (action === 'eligibility') {
      return json({ eligibleOrderIds: await eligibleOrders(user.id, productName) });
    }

    if (action !== 'submit') return json({ error: 'invalid_action' }, 400);

    const orderId = typeof body?.orderId === 'string' ? body.orderId.trim() : '';
    const rating = Number(body?.rating);
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const reviewText = typeof body?.reviewText === 'string' ? body.reviewText.trim() : '';
    if (!orderId || !Number.isInteger(rating) || rating < 1 || rating > 5) return json({ error: 'invalid_review' }, 400);
    if (title.length < 3 || title.length > 80 || reviewText.length < 20 || reviewText.length > 1000) {
      return json({ error: 'invalid_review_length' }, 400);
    }
    if (hasBlockedContent(`${title}\n${reviewText}`)) return json({ error: 'content_rejected' }, 422);

    const eligible = await eligibleOrders(user.id, productName);
    if (!eligible.includes(orderId)) return json({ error: 'purchase_not_eligible' }, 403);

    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count, error: rateLimitError } = await supabase
      .from('product_reviews')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', cutoff);
    if (rateLimitError) return json({ error: 'review_unavailable' }, 503);
    if ((count ?? 0) >= 5) return json({ error: 'rate_limited' }, 429);

    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', user.id)
      .maybeSingle();
    const firstName = profile?.first_name?.trim() || 'Verifizierter Käufer';
    const lastInitial = profile?.last_name?.trim()?.charAt(0);
    const displayName = lastInitial ? `${firstName} ${lastInitial}.` : firstName;

    const { error: insertError } = await supabase.from('product_reviews').insert({
      order_id: orderId,
      user_id: user.id,
      product_name: productName,
      display_name: displayName,
      rating,
      title,
      review_text: reviewText,
      status: 'pending',
    });
    if (insertError?.code === '23505') return json({ error: 'review_already_submitted' }, 409);
    if (insertError) return json({ error: 'review_unavailable' }, 503);

    return json({ submitted: true, status: 'pending' }, 201);
  } catch (error) {
    console.error('Product review request failed:', error);
    return json({ error: error instanceof Error ? error.message : 'review_unavailable' }, 500);
  }
});
