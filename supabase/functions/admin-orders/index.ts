import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const ADMIN_EMAILS = (Deno.env.get('ADMIN_EMAILS') ?? 'lehmannjim13@gmail.com')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean);
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, x-client-info, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const ORDER_STATUSES = ['Bearbeitung', 'Versendet', 'Geliefert', 'Storniert'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'];

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
});

const db = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })
  : null;

async function requireAdmin(request: Request) {
  const token = request.headers.get('Authorization')?.replace(/^Bearer\s+/i, '');
  if (!token || !db) return null;
  const { data, error } = await db.auth.getUser(token);
  const email = data?.user?.email?.toLowerCase();
  if (error || !email || !ADMIN_EMAILS.includes(email)) return null;
  return data.user;
}

serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!db) return json({ error: 'service_unavailable' }, 503);

  const admin = await requireAdmin(request);
  if (!admin) return json({ error: 'forbidden' }, 403);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_request' }, 400);
  }

  if (body.action === 'update') {
    const orderId = typeof body.orderId === 'string' ? body.orderId : '';
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (body.status !== undefined) {
      if (!ORDER_STATUSES.includes(String(body.status))) return json({ error: 'invalid_status' }, 400);
      updates.status = body.status;
    }
    if (body.paymentStatus !== undefined) {
      if (!PAYMENT_STATUSES.includes(String(body.paymentStatus))) return json({ error: 'invalid_payment_status' }, 400);
      updates.payment_status = body.paymentStatus;
    }
    if (body.adminNote !== undefined) updates.admin_note = String(body.adminNote).slice(0, 2000);
    if (!orderId || Object.keys(updates).length === 1) return json({ error: 'invalid_request' }, 400);

    const { data, error } = await db.from('orders').update(updates).eq('id', orderId).select('id').maybeSingle();
    if (error) {
      console.error('Admin order update failed:', error.message);
      return json({ error: 'update_failed' }, 500);
    }
    return data ? json({ updated: true }) : json({ error: 'not_found' }, 404);
  }

  if (body.action !== 'list') return json({ error: 'invalid_action' }, 400);

  const { data: orders, error: ordersError } = await db
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);
  if (ordersError) {
    console.error('Admin order list failed:', ordersError.message);
    return json({ error: 'lookup_failed' }, 500);
  }

  const orderIds = (orders ?? []).map(order => order.id);
  const userIds = [...new Set((orders ?? []).map(order => order.user_id).filter(Boolean))];
  const [itemsResult, profilesResult] = await Promise.all([
    orderIds.length ? db.from('order_items').select('*').in('order_id', orderIds) : Promise.resolve({ data: [], error: null }),
    userIds.length ? db.from('profiles').select('id, first_name, last_name').in('id', userIds) : Promise.resolve({ data: [], error: null }),
  ]);
  if (itemsResult.error || profilesResult.error) return json({ error: 'lookup_failed' }, 500);

  const profiles = new Map((profilesResult.data ?? []).map(profile => [profile.id, profile]));
  const accountEmails = new Map<string, string>();
  await Promise.all(userIds.map(async (userId) => {
    const { data } = await db.auth.admin.getUserById(userId as string);
    if (data?.user?.email) accountEmails.set(userId as string, data.user.email);
  }));

  const itemsByOrder = new Map<string, unknown[]>();
  for (const item of itemsResult.data ?? []) {
    const list = itemsByOrder.get(item.order_id) ?? [];
    list.push(item);
    itemsByOrder.set(item.order_id, list);
  }

  return json({
    orders: (orders ?? []).map(order => {
      const profile = order.user_id ? profiles.get(order.user_id) : null;
      return {
        ...order,
        customer_email: order.customer_email || accountEmails.get(order.user_id) || null,
        customer_name: profile ? [profile.first_name, profile.last_name].filter(Boolean).join(' ') : '',
        items: itemsByOrder.get(order.id) ?? [],
      };
    }),
  });
});
