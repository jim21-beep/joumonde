// @ts-nocheck — Deno runtime, not Node.js; false positives from VS Code TS server
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY   = Deno.env.get('RESEND_API_KEY') ?? '';
const SUPABASE_URL     = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const MAIL_FROM = 'Joumonde <support@joumonde.com>';
const createOrderId = () => {
  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);
  return `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${String(randomValue[0] % 1_000_000_000).padStart(9, '0')}`;
};
const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]!));

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

  if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE) {
    console.error('Missing required env vars for edge function');
    return json({ error: 'Server-Konfiguration fehlt' }, 500);
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
        return json({ error: 'Datenbank-Fehler' }, 500);
      }
    }

    // ── 1b. Contact form: save to DB and forward to the Joumonde team ───────────
    if (type === 'contact') {
      const { name = '', subject: contactSubject = '', message = '', phone = '' } = body;
      const db = createClient(SUPABASE_URL, SUPABASE_SERVICE);
      const { error: dbErr } = await db
        .from('contact_messages')
        .insert({ name, email, phone, subject: contactSubject, message });
      if (dbErr) console.error('Contact DB insert error:', dbErr);

      const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

      // Forward to admin
      const adminRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: MAIL_FROM,
          to: ['info@joumonde.com'],
          reply_to: email,
          subject: `Neue Kontaktanfrage: ${esc(contactSubject) || '(kein Betreff)'}`,
          html: `<div style="font-family:sans-serif;max-width:600px;">
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>Von:</strong> ${esc(name)} (${esc(email)})</p>
            ${phone ? `<p><strong>Telefon:</strong> ${esc(phone)}</p>` : ''}
            <p><strong>Betreff:</strong> ${esc(contactSubject)}</p>
            <hr>
            <p style="white-space:pre-wrap;">${esc(message)}</p>
          </div>`,
        }),
      });
      if (!adminRes.ok) console.error('Admin email error:', await adminRes.text());

      // Auto-reply to sender
      const replyRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: MAIL_FROM,
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
                In der Regel antworten wir innerhalb von 24 Stunden. Bei Fragen zu Joumonde hilft dir Nexara direkt im Shop weiter.
              </p>
              <div style="text-align:center;margin:2rem 0;">
                <a href="https://joumonde.com/shop.html?openNexara=1"
                   style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#d4af37,#c9a961);color:#1a1a1a;text-decoration:none;border-radius:8px;font-weight:700;font-size:1rem;">
                  ✦ Nexara fragen
                </a>
              </div>
              <hr style="border:none;border-top:1px solid #2a2a2a;margin:2rem 0;">
              <p style="color:#555;font-size:0.8rem;text-align:center;">
                <a href="https://joumonde.com" style="color:#888;">joumonde.com</a>
                &nbsp;|&nbsp;
                <a href="mailto:support@joumonde.com" style="color:#888;">support@joumonde.com</a>
              </p>
            </div>`,
        }),
      });
      if (!replyRes.ok) {
        console.error('Auto-reply error:', await replyRes.text());
        return json({ error: 'Bestätigungs-E-Mail konnte nicht gesendet werden' }, 502);
      }
      if (!adminRes.ok) return json({ error: 'Kontaktanfrage konnte nicht weitergeleitet werden' }, 502);

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
          <a href="mailto:support@joumonde.com" style="color:#888;">support@joumonde.com</a>
        </p>
      </div>`;

    let subject: string;
    let html: string;
    let orderSaved = false;

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
      const {
        firstName = '',
        orderId = '',
        items = [],
        total = 0,
        orderDate = '',
        currency = 'CHF',
        shippingAddress = {},
        persistOrder = false,
        paymentMethod = 'card'
      } = body;
      const finalOrderId = String(orderId || createOrderId());
      const safeFirstName = escapeHtml(firstName);
      const safeOrderDate = escapeHtml(orderDate);
      const safeCurrency = escapeHtml(currency);

      if (persistOrder) {
        try {
          const db = createClient(SUPABASE_URL, SUPABASE_SERVICE);
          const normalizedPaymentMethod = ['card', 'amex', 'paypal'].includes(paymentMethod) ? paymentMethod : 'card';
          const paymentProvider = normalizedPaymentMethod === 'paypal' ? 'paypal' : 'card';
          const accessToken = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '') ?? '';
          const { data: { user: verifiedUser }, error: authError } = accessToken
            ? await db.auth.getUser(accessToken)
            : { data: { user: null }, error: null };
          if (authError) {
            console.error('Could not verify checkout session:', authError.message);
            return json({ error: 'Sitzung abgelaufen. Bitte melde dich erneut an.' }, 401);
          }

          if (verifiedUser?.id) {
            const { error: profileError } = await db
              .from('profiles')
              .upsert({ id: verifiedUser.id }, { onConflict: 'id', ignoreDuplicates: true });
            if (profileError) {
              console.error('Could not ensure order profile exists:', profileError);
              return json({ error: 'Konto konnte nicht für die Bestellung vorbereitet werden' }, 500);
            }
          }

          const orderPayload = {
            id: finalOrderId,
            user_id: verifiedUser?.id || null,
            status: 'Bearbeitung',
            total: Number(total || 0),
            currency,
            payment_method: normalizedPaymentMethod,
            payment_status: 'pending',
            payment_provider: paymentProvider,
            provider_payment_id: null,
          };

          const { error: orderErr } = await db.from('orders').insert(orderPayload);

          if (orderErr) {
            console.error('Order insert error:', orderErr);
            return json({ error: 'Bestellung konnte nicht gespeichert werden' }, 500);
          } else {
            const orderItems = (items as Array<{ name: string; quantity: number; price: number; size?: string; color?: string; article_number?: string; isPreorder?: boolean }>).map(i => ({
              order_id: finalOrderId,
              product_name: i.name,
              quantity: Number(i.quantity || 1),
              unit_price: Number(i.price || 0),
              size: i.size ?? null,
              color: i.color ?? null,
              article_number: i.article_number ?? null,
              is_preorder: i.isPreorder === true,
            }));

            if (orderItems.length > 0) {
              const { error: itemsErr } = await db.from('order_items').insert(orderItems);
              if (itemsErr) {
                console.error('Order item fallback insert error:', itemsErr);
                const { error: cleanupError } = await db.from('orders').delete().eq('id', finalOrderId);
                if (cleanupError) console.error('Could not remove incomplete order:', cleanupError);
                return json({ error: 'Bestellpositionen konnten nicht gespeichert werden' }, 500);
              } else {
                orderSaved = true;
              }
            } else {
              orderSaved = true;
            }
          }
        } catch (dbEx) {
          console.error('Order save failed:', dbEx);
          return json({ error: 'Bestellung konnte nicht gespeichert werden' }, 500);
        }
      }

      const preorderItems = (items as Array<{ isPreorder?: boolean }>).some(item => item.isPreorder === true);
      const itemRows = (items as Array<{ name: string; quantity: number; price: number; isPreorder?: boolean }>)
        .map(i => `
          <tr>
            <td style="padding:14px 12px;border-bottom:1px solid #e9e6df;color:#354138;">${escapeHtml(i.name)}${i.isPreorder ? '<br><span style="color:#8b806d;font-size:11px;">VORBESTELLUNG</span>' : ''}</td>
            <td style="padding:14px 12px;border-bottom:1px solid #e9e6df;text-align:center;color:#74796f;">${Number(i.quantity)}</td>
            <td style="padding:14px 12px;border-bottom:1px solid #e9e6df;text-align:right;color:#354138;white-space:nowrap;">${safeCurrency} ${(Number(i.price) * Number(i.quantity)).toFixed(2)}</td>
          </tr>`).join('');
      const address = shippingAddress as { firstName?: string; lastName?: string; street?: string; zip?: string; city?: string; country?: string };
      const addressLines = [
        [address.firstName, address.lastName].filter(Boolean).join(' '),
        address.street,
        [address.zip, address.city].filter(Boolean).join(' '),
        address.country,
      ].filter(Boolean).map(line => `<div>${escapeHtml(line)}</div>`).join('');
      const paymentLabels: Record<string, string> = { card: 'Kreditkarte', amex: 'American Express', paypal: 'PayPal' };
      const safePaymentMethod = escapeHtml(paymentLabels[paymentMethod] || paymentLabels.card);
      subject = `${preorderItems ? 'Deine Vorbestellung' : 'Deine Bestellung'} ${escapeHtml(finalOrderId)} – Joumonde`;
      html = `
        <div style="margin:0;padding:32px 12px;background:#f2f1eb;font-family:Arial,Helvetica,sans-serif;color:#354138;">
          <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e7e5dd;">
            <div style="padding:30px 36px 24px;border-bottom:1px solid #e9e6df;text-align:center;">
              <p style="margin:0;color:#354138;font-family:Georgia,serif;font-size:21px;letter-spacing:5px;">JOUMONDE</p>
              <p style="margin:10px 0 0;color:#898d82;font-size:10px;letter-spacing:2px;">ZEITLOSES DESIGN. MIT LIEBE AUSGEWÄHLT.</p>
            </div>
            <div style="padding:36px;">
              <p style="margin:0 0 10px;color:#8b806d;font-size:11px;font-weight:bold;letter-spacing:1.8px;">${preorderItems ? 'VORBESTELLUNG' : 'BESTELLBESTÄTIGUNG'}</p>
              <h1 style="margin:0 0 12px;color:#354138;font-family:Georgia,serif;font-size:27px;font-weight:normal;line-height:1.3;">Danke${safeFirstName ? `, ${safeFirstName}` : ''}.</h1>
              <p style="margin:0;color:#72776e;font-size:15px;line-height:1.7;">${preorderItems ? 'Deine Vorbestellung ist bei uns eingegangen. Es wurde noch keine Zahlung ausgelöst. Den voraussichtlichen Liefertermin bestätigen wir dir separat.' : 'Deine Bestellung ist bei uns eingegangen. Wir bereiten alles sorgfältig für dich vor und halten dich über den Versand auf dem Laufenden.'}</p>
              <div style="margin:26px 0;padding:18px 20px;background:#f7f7f3;border:1px solid #ebeae3;">
                <table role="presentation" style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="padding:3px 0;color:#81857b;font-size:12px;">Bestellnummer</td>
                    <td style="padding:3px 0;text-align:right;color:#354138;font-size:14px;font-weight:bold;">${escapeHtml(finalOrderId)}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0 3px;color:#81857b;font-size:12px;">Bestelldatum</td>
                    <td style="padding:9px 0 3px;text-align:right;color:#354138;font-size:13px;">${safeOrderDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:9px 0 3px;color:#81857b;font-size:12px;">Status</td>
                    <td style="padding:9px 0 3px;text-align:right;color:#526b56;font-size:13px;font-weight:bold;">In Bearbeitung</td>
                  </tr>
                </table>
              </div>
              <h2 style="margin:30px 0 10px;color:#354138;font-family:Georgia,serif;font-size:19px;font-weight:normal;">Deine Artikel</h2>
              <table role="presentation" style="width:100%;border-collapse:collapse;font-size:13px;">
                <thead>
                  <tr style="border-bottom:1px solid #d9d8cf;">
                    <th style="padding:10px 12px;text-align:left;color:#81857b;font-size:10px;font-weight:bold;letter-spacing:1px;">ARTIKEL</th>
                    <th style="padding:10px 12px;text-align:center;color:#81857b;font-size:10px;font-weight:bold;letter-spacing:1px;">MENGE</th>
                    <th style="padding:10px 12px;text-align:right;color:#81857b;font-size:10px;font-weight:bold;letter-spacing:1px;">PREIS</th>
                  </tr>
                </thead>
                <tbody>${itemRows}</tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding:18px 12px 4px;color:#354138;font-size:14px;font-weight:bold;">Gesamt</td>
                    <td style="padding:18px 12px 4px;text-align:right;color:#354138;font-size:16px;font-weight:bold;white-space:nowrap;">${safeCurrency} ${Number(total).toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
              <div style="margin-top:30px;padding-top:22px;border-top:1px solid #e9e6df;">
                <h2 style="margin:0 0 10px;color:#354138;font-family:Georgia,serif;font-size:17px;font-weight:normal;">Lieferung</h2>
                <div style="color:#72776e;font-size:13px;line-height:1.7;">${addressLines || 'Die Lieferadresse findest du in deinem Kundenkonto.'}</div>
                <p style="margin:14px 0 0;color:#72776e;font-size:13px;">Zahlungsart: ${safePaymentMethod}</p>
              </div>
              <p style="margin:28px 0 0;color:#72776e;font-size:13px;line-height:1.7;">Bei Fragen sind wir gerne für dich da: <a href="mailto:support@joumonde.com" style="color:#526b56;text-decoration:underline;">support@joumonde.com</a>.</p>
            </div>
            <div style="padding:20px 30px;background:#f7f7f3;border-top:1px solid #e9e6df;text-align:center;">
              <p style="margin:0;color:#898d82;font-size:11px;">Mit Sorgfalt ausgewählt für deinen Alltag.</p>
              <p style="margin:8px 0 0;color:#898d82;font-size:11px;"><a href="https://joumonde.com" style="color:#526b56;text-decoration:none;">joumonde.com</a></p>
            </div>
          </div>
        </div>`;

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
          <a href="https://joumonde.com/#preview"
             style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#d4af37,#c9a961);color:#1a1a1a;text-decoration:none;border-radius:8px;font-weight:bold;font-size:1rem;">
            Kollektionen entdecken
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
        from: MAIL_FROM,
        to: [email],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend error:', res.status, errText);
      return json({ error: 'E-Mail Versand fehlgeschlagen' }, 502);
    }

    const resData = await res.json();
    console.log('Email sent, id:', resData?.id);
    return json({ success: true, orderSaved });

  } catch (e) {
    console.error('Edge function error:', e);
    return json({ error: 'Interner Serverfehler', warning: String(e) }, 500);
  }
});
