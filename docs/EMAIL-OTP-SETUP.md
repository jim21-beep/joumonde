# E-Mail-Code-Anmeldung einrichten

Die Code-Eingabe befindet sich auf `public/account.html`. Supabase versendet den Code selbst; die Website kann keinen Code aus einer Supabase-E-Mail auslesen oder nachträglich auf einer eigenen Seite anzeigen.

## Supabase weiterleiten lassen

Im Supabase-Dashboard unter **Authentication → URL Configuration**:

- Als **Site URL** die Joumonde-Shop-URL eintragen, zum Beispiel `https://joumonde.com`.
- Unter **Redirect URLs** `https://joumonde.com/account.html` zulassen. Weitere produktiv verwendete Shop-Domains oder Vorschau-Domains ebenfalls einzeln eintragen.

Die Website übergibt `account.html` beim Anfordern eines Codes als `emailRedirectTo`. Der Redirect muss in Supabase zugelassen sein, damit Bestätigungslinks zur Kontoseite und nicht zur Site-URL zurückführen.

## OTP-Code in der E-Mail anzeigen

Unter **Authentication → Email Templates** die für die Anmeldung verwendete Vorlage (zum Beispiel **Magic Link**) so anpassen, dass sie `{{ .Token }}` enthält. Eine minimale Vorlage ist:

```html
<h2>Dein Joumonde-Anmeldecode</h2>
<p>Gib diesen Code auf der Joumonde-Anmeldeseite ein:</p>
<h1>{{ .Token }}</h1>
<p>Falls du die Anmeldung nicht angefordert hast, kannst du diese E-Mail ignorieren.</p>
```

Die Vorlage darf nicht nur `{{ .ConfirmationURL }}` enthalten: Das ist ein anklickbarer Magic Link und kein sichtbarer Code. Mit der Code-Vorlage wird der sechsstellige Code aus der E-Mail in die sechs Felder auf der Anmeldeseite eingegeben.
