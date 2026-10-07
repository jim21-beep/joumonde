import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
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
const encoder = new TextEncoder();
const hmacKey = SUPABASE_SERVICE_ROLE_KEY
  ? crypto.subtle.importKey(
    'raw',
    encoder.encode(SUPABASE_SERVICE_ROLE_KEY),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  : null;

async function keyedHash(value: string): Promise<string> {
  if (!hmacKey) throw new Error('service_unavailable');
  const key = await hmacKey;
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return [...new Uint8Array(signature)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function createSixDigitCode(): string {
  const range = 0x100000000;
  const limit = range - (range % 1_000_000);
  const random = new Uint32Array(1);
  do {
    crypto.getRandomValues(random);
  } while (random[0] >= limit);
  return String(random[0] % 1_000_000).padStart(6, '0');
}

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email) ? email : null;
}

async function sendCodeEmail(email: string, code: string): Promise<boolean> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Joumonde <support@joumonde.com>',
      to: [email],
      subject: `Dein Code lautet ${code}`,
      html: `
        <div style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;mso-hide:all;">
          Dein Joumonde-Anmeldecode lautet ${code}. Der Code ist zehn Minuten gültig.
        </div>
        <div style="margin:0 auto;max-width:560px;padding:40px 24px;background:#fbfaf7;color:#302a22;font-family:Arial,sans-serif;">
          <div style="margin-bottom:28px;text-align:center;">
            <p style="margin:0;color:#51483b;font-family:Georgia,serif;font-size:24px;letter-spacing:0.18em;">JOUMONDE</p>
          </div>
          <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:24px;font-weight:400;text-align:center;">Dein Anmeldecode</h1>
          <p style="font-size:16px;line-height:1.6;text-align:center;">Gib diesen sechsstelligen Code auf der Joumonde-Anmeldeseite ein. Du brauchst keinen Link anzuklicken.</p>
          <p style="margin:28px 0;padding:20px;border:1px solid #e8e1d5;background:#fff;color:#51483b;font-size:32px;font-weight:700;letter-spacing:0.3em;text-align:center;">${code}</p>
          <p style="color:#766d60;font-size:13px;line-height:1.6;text-align:center;">Der Code ist zehn Minuten gültig. Falls du diese Anmeldung nicht angefordert hast, kannst du diese E-Mail ignorieren.</p>
        </div>`,
    }),
  });
  if (!response.ok) console.error('OTP email delivery failed:', response.status);
  return response.ok;
}

async function issueCode(request: Request, email: string): Promise<Response> {
  if (!supabase || !RESEND_API_KEY) return json({ error: 'service_unavailable' }, 503);

  const code = createSixDigitCode();
  const emailHash = await keyedHash(`email:${email}`);
  const codeHash = await keyedHash(`code:${email}:${code}`);
  const ip = request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-real-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0].trim();
  const ipHash = await keyedHash(ip ? `ip:${ip}` : `email-ip-fallback:${emailHash}`);
  const { data: issued, error } = await supabase.rpc('issue_email_login_code', {
    p_email_hash: emailHash,
    p_ip_hash: ipHash,
    p_code_hash: codeHash,
  });
  if (error) {
    console.error('Could not issue sign-in code:', error.code ?? 'database_error');
    return json({ error: 'service_unavailable' }, 503);
  }

  if (!issued) return json({ accepted: true, sent: false });

  let delivered = false;
  try {
    delivered = await sendCodeEmail(email, code);
  } catch (error) {
    console.error('OTP email delivery failed:', error instanceof Error ? error.message : 'network_error');
  }
  if (!delivered) {
    const { error: discardError } = await supabase.rpc('discard_email_login_code', {
      p_email_hash: emailHash,
      p_code_hash: codeHash,
    });
    if (discardError) console.error('Could not discard undelivered sign-in code:', discardError.code ?? 'database_error');
    return json({ error: 'email_delivery_failed' }, 503);
  }

  return json({ accepted: true, sent: true });
}

function isDuplicateUserError(error: { code?: string; message?: string }): boolean {
  return error.code === 'email_exists'
    || error.code === 'user_already_exists'
    || /already (registered|exists)/i.test(error.message ?? '');
}

function isMissingUserError(error: { code?: string; message?: string }): boolean {
  return error.code === 'user_not_found' || /user not found/i.test(error.message ?? '');
}

async function createSessionToken(email: string): Promise<string> {
  if (!supabase) throw new Error('service_unavailable');

  let { data, error } = await supabase.auth.admin.generateLink({ type: 'magiclink', email });
  if (error && isMissingUserError(error)) {
    const { error: createError } = await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (createError && !isDuplicateUserError(createError)) {
      console.error('Could not create verified sign-in user:', createError.code ?? 'auth_error');
      throw new Error('session_creation_failed');
    }
    ({ data, error } = await supabase.auth.admin.generateLink({ type: 'magiclink', email }));
  }

  if (error || !data?.properties?.hashed_token) {
    console.error('Could not create Supabase sign-in token:', error?.code ?? 'missing_token');
    throw new Error('session_creation_failed');
  }

  return data.properties.hashed_token;
}

async function verifyCode(request: Request, email: string, value: unknown): Promise<Response> {
  if (!supabase || !SUPABASE_SERVICE_ROLE_KEY) return json({ error: 'service_unavailable' }, 503);
  if (typeof value !== 'string' || !/^\d{6}$/.test(value)) {
    return json({ valid: false });
  }

  const emailHash = await keyedHash(`email:${email}`);
  const codeHash = await keyedHash(`code:${email}:${value}`);
  const ip = request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-real-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0].trim();
  const ipHash = await keyedHash(ip ? `ip:${ip}` : `email-ip-fallback:${emailHash}`);
  const { data: valid, error } = await supabase.rpc('consume_email_login_code', {
    p_email_hash: emailHash,
    p_code_hash: codeHash,
    p_ip_hash: ipHash,
  });
  if (error) {
    console.error('Could not verify sign-in code:', error.code ?? 'database_error');
    return json({ error: 'service_unavailable' }, 503);
  }
  if (!valid) return json({ valid: false });

  try {
    return json({ tokenHash: await createSessionToken(email) });
  } catch {
    return json({ error: 'session_creation_failed' }, 503);
  }
}

serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  if (!supabase || !SUPABASE_SERVICE_ROLE_KEY) return json({ error: 'service_unavailable' }, 503);

  try {
    const body = await request.json();
    const email = normalizeEmail(body?.email);
    if (!email) return json({ error: 'invalid_email' }, 400);

    if (body?.action === 'send') return await issueCode(request, email);
    if (body?.action === 'verify') return await verifyCode(request, email, body?.code);
    return json({ error: 'invalid_action' }, 400);
  } catch (error) {
    console.error('Email sign-in request failed:', error instanceof Error ? error.message : 'unknown_error');
    return json({ error: 'service_unavailable' }, 500);
  }
});
