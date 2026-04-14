import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY   = Deno.env.get('RESEND_API_KEY') ?? '';
const SUPABASE_URL     = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }

  try {
    const body = await req.json();
    const { type = 'newsletter', email } = body;

    if (!email) return json({ error: 'E-Mail fehlt' }, 400);

    // ── 1. Newsletter: save subscriber server-side (service role bypasses RLS) ──
    if (type === 'newsletter') {
      const db = createClient(SUPABASE_URL, SUPABASE_SERVICE);
      const source = body.source ?? 'website';
      const { error: dbErr } = await db
        .from('newsletter_subscribers')
        .insert({ email, source });

      if (dbErr?.code === '23505') {
        return json({ alreadySubscribed: true });
      }
      if (dbErr) {
        console.error('DB insert error:', dbErr);
      }
    }

    // ── 1b. Contact form: save to DB and forward to info@joumonde.com ────────────
    if (type === 'contact') {
      const { name = '', subject: contactSubject = '', message = '', phone = '' } = body;
      const db = createClient(SUPABASE_URL, SUPABASE_SERVICE);
      const { error: dbErr } = await db
        .from('contact_messages')
        .insert({ name, email, phone, subject: contactSubject, message });
      if (dbErr) console.error('Contact DB insert error:', dbErr);

      // Forward to admin
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Joumonde Kontakt <info@joumonde.com>',
          to: ['info@joumonde.com'],
          reply_to: email,
          subject: `Neue Kontaktanfrage: ${contactSubject || '(kein Betreff)'}`,
          html: `<div style="font-family:sans-serif;max-width:600px;">
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>Von:</strong> ${name} (${email})</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
            <p><strong>Betreff:</strong> ${contactSubject}</p>
            <hr>
            <p style="white-space:pre-wrap;">${message}</p>
          </div>`,
        }),
      });
      if (!adminRes.ok) console.error('Admin email error:', await adminRes.text());

      // Auto-reply to sender
      const replyRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Joumonde <info@joumonde.com>',
          to: [email],
          subject: 'Wir haben deine Nachricht erhalten – Joumonde',
          html: `
            <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f0e8;padding:40px;">
              <div style="text-align:center;margin-bottom:32px;">
                <h1 style="color:#d4af37;font-size:2rem;letter-spacing:0.2em;margin:0;">JOUMONDE</h1>
              </div>
              <h2 style="color:#d4af37;margin-bottom:0.75rem;">Anfrage erhalten, ${name}!</h2>
              <p style="line-height:1.8;margin-bottom:0.75rem;">
                Vielen Dank für deine Nachricht. Wir haben deine Anfrage erhalten und werden uns
                <strong style="color:#d4af37;">so schnell wie möglich</strong> darum kümmern.
              </p>
              <p style="color:#aaa;font-size:0.9rem;line-height:1.7;margin-bottom:2rem;">
                In der Regel antworten wir innerhalb von 24 Stunden. Solltest du dringend Hilfe benötigen,
                nutze gerne unseren Live-Chat — dort sind wir sofort für dich da.
              </p>
              <div style="text-align:center;margin:2rem 0;">
                <a href="https://joumonde.com/live-chat.html"
                   style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#d4af37,#c9a961);color:#1a1a1a;text-decoration:none;border-radius:8px;font-weight:700;font-size:1rem;">
                  💬 Live-Chat starten
                </a>
              </div>
              <hr style="border:none;border-top:1px solid #2a2a2a;margin:2rem 0;">
              <p style="color:#555;font-size:0.8rem;text-align:center;">
                <a href="https://joumonde.com" style="color:#888;">joumonde.com</a>
                &nbsp;|&nbsp;
                <a href="mailto:info@joumonde.com" style="color:#888;">info@joumonde.com</a>
              </p>
            </div>`,
        }),
      });
      if (!replyRes.ok) console.error('Auto-reply error:', await replyRes.text());

      return json({ success: true });
    }

    // ── 2. Build email content per type ──────────────────────────────────────────
    const HEADER = `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f5f0e8;padding:40px;">
        <div style="text-align:center;margin-bottom:30px;">
          <h1 style="color:#d4af37;font-size:2rem;letter-spacing:0.2em;margin:0;">JOUMONDE</h1>
        </div>`;
    const FOOTER = `
        <p style="color:#888;font-size:0.8rem;text-align:center;margin-top:40px;">
          <a href="https://joumonde.com" style="color:#888;">joumonde.com</a>
          &nbsp;|&nbsp;
          <a href="mailto:info@joumonde.com" style="color:#888;">info@joumonde.com</a>
        </p>
      </div>`;

    let subject: string;
    let html: string;

    if (type === 'registration') {
      const { firstName = '', lastName = '', registeredAt = '' } = body;
      subject = `Willkommen bei Joumonde, ${firstName}!`;
      html = `${HEADER}
        <h2 style="color:#d4af37;">Willkommen, ${firstName}!</h2>
        <p>Dein Konto wurde erfolgreich erstellt. Du kannst dich jetzt anmelden und shoppen.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr>
            <td style="padding:8px;border-bottom:1px solid #333;color:#aaa;">Name</td>
            <td style="padding:8px;border-bottom:1px solid #333;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding:8px;border-bottom:1px solid #333;color:#aaa;">E-Mail</td>
            <td style="padding:8px;border-bottom:1px solid #333;">${email}</td>
          </tr>
          <tr>
            <td style="padding:8px;color:#aaa;">Registriert am</td>
            <td style="padding:8px;">${registeredAt}</td>
          </tr>
        </table>
        <div style="text-align:center;margin:30px 0;">
          <a href="https://joumonde.com/shop.html"
             style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#d4af37,#c9a961);color:#1a1a1a;text-decoration:none;border-radius:8px;font-weight:bold;font-size:1rem;">
            Jetzt shoppen
          </a>
        </div>
        ${FOOTER}`;

    } else if (type === 'order-confirmation') {
      const { firstName = '', orderId = '', items = [], total = 0, orderDate = '' } = body;
      const itemRows = (items as Array<{ name: string; quantity: number; price: number }>)
        .map(i => `
          <tr>
            <td style="padding:10px 8px;border-bottom:1px solid #222;">${i.name}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #222;text-align:center;">${i.quantity}</td>
            <td style="padding:10px 8px;border-bottom:1px solid #222;text-align:right;">CHF ${(i.price * i.quantity).toFixed(2)}</td>
          </tr>`).join('');
      subject = `Bestellbestätigung #${orderId} – Joumonde`;
      html = `${HEADER}
        <h2 style="color:#d4af37;">Danke für deine Bestellung, ${firstName}!</h2>
        <p>Wir haben deine Bestellung erhalten und werden sie so schnell wie möglich bearbeiten.</p>
        <p style="color:#aaa;font-size:0.9rem;">
          Bestellnummer: <strong style="color:#f5f0e8;">${orderId}</strong>
          &nbsp;|&nbsp; ${orderDate}
        </p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0;">
          <thead>
            <tr style="border-bottom:1px solid #d4af37;">
              <th style="padding:10px 8px;text-align:left;color:#d4af37;">Artikel</th>
              <th style="padding:10px 8px;text-align:center;color:#d4af37;">Menge</th>
              <th style="padding:10px 8px;text-align:right;color:#d4af37;">Preis</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:12px 8px;font-weight:bold;color:#d4af37;border-top:1px solid #333;">Gesamt</td>
              <td style="padding:12px 8px;font-weight:bold;text-align:right;color:#d4af37;border-top:1px solid #333;">CHF ${Number(total).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        <p style="color:#aaa;font-size:0.9rem;">
          Bei Fragen erreichst du uns unter
          <a href="mailto:info@joumonde.com" style="color:#d4af37;">info@joumonde.com</a>.
        </p>
        ${FOOTER}`;

    } else {
      // newsletter
      subject = 'Du bist dabei – Joumonde Newsletter';
      html = `${HEADER}
        <h2 style="color:#d4af37;">Du bist dabei!</h2>
        <p>Herzlich willkommen in der Joumonde Community.</p>
        <p>Du wirst als Erstes über unsere Neuheiten, exklusive Angebote und den offiziellen Launch informiert.</p>
        <div style="margin:30px 0;padding:20px;border:1px solid #d4af37;text-align:center;">
          <p style="color:#d4af37;font-style:italic;margin:0;">
            "Wo zeitlose Eleganz auf urbanen Style trifft."
          </p>
        </div>
        <div style="text-align:center;margin:30px 0;">
          <a href="https://joumonde.com/shop-preview.html"
             style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#d4af37,#c9a961);color:#1a1a1a;text-decoration:none;border-radius:8px;font-weight:bold;font-size:1rem;">
            Shop Preview ansehen
          </a>
        </div>
        <p style="color:#555;font-size:0.8rem;text-align:center;margin-top:40px;">
          Du erhältst diese E-Mail, weil du dich auf joumonde.com angemeldet hast.<br>
          <a href="https://joumonde.com/newsletter-unsubscribe.html?email=${encodeURIComponent(email)}"
             style="color:#555;">Abmelden</a>
        </p>
      </div>`;
    }

    // ── 3. Send via Resend (raw fetch — works natively in Deno) ─────────────────
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Joumonde <info@joumonde.com>',
        to: [email],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend error:', res.status, errText);
      return json({ success: true });
    }

    const resData = await res.json();
    console.log('Email sent, id:', resData?.id);
    return json({ success: true });

  } catch (e) {
    console.error('Edge function error:', e);
    // Always return success to client — log error server-side
    return json({ success: true, warning: String(e) });
  }
});
