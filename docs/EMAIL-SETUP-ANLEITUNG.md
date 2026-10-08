# 📧 E-Mail Benachrichtigungen einrichten

## ✅ Was bereits implementiert ist:

Das System sendet automatisch E-Mails bei:
1. **Neue Registrierung** - Du bekommst eine Benachrichtigung wenn sich jemand registriert
2. **Neue Bestellung** - Du bekommst eine Benachrichtigung bei jeder Bestellung
3. **Kontaktformular** - Funktion vorbereitet für Kontaktanfragen

## 🚀 Setup in 2 Schritten:

### Schritt 1: FormSubmit aktivieren (EINMALIG)

FormSubmit ist ein kostenloser Service, der keine Registrierung benötigt!

1. **Erste Registrierung testen**:
   - Gehe auf deine Website
   - Registriere einen Test-User
   - FormSubmit sendet dir eine **Bestätigungs-E-Mail an info@joumonde.com**

2. **E-Mail-Adresse bestätigen**:
   - Öffne die E-Mail von FormSubmit
   - Klick auf den Bestätigungslink
   - **Fertig!** Ab jetzt funktionieren alle E-Mails automatisch

### Schritt 2: Teste das System

**Test 1 - Registrierung:**
```
1. Registriere einen neuen User auf der Website
2. Du erhältst eine E-Mail mit:
   - Name des neuen Users
   - E-Mail-Adresse
   - Registrierungsdatum
   - Newsletter-Status
```

**Test 2 - Bestellung:**
```
1. Lege Artikel in den Warenkorb
2. Gehe zur Kasse
3. Schließe Bestellung ab
4. Du erhältst eine E-Mail mit:
   - Bestellnummer
   - Kundenname & E-Mail
   - Alle Artikel mit Preisen
   - Gesamtbetrag
   - Datum & Status
```

## 📧 Welche E-Mails werden gesendet?

### 1. Registrierungs-Benachrichtigung
**An:** info@joumonde.com  
**Betreff:** "Neue Registrierung bei Joumonde!"  
**Inhalt:**
- Name: Max Mustermann
- E-Mail: max@example.com
- Registriert am: 12.12.2025, 14:30
- Newsletter: Ja

### 2. Bestellbestätigung
**Absender:** Joumonde <support@joumonde.com>
**Betreff:** "Deine Bestellung 20261008123456789 – Joumonde"
**Inhalt:**
- Bestell-Nr: 20261008123456789
- Kunde: Max Mustermann
- E-Mail: max@example.com
- Artikel: 
  - Signature Blazer × 1 = CHF 299.90
  - Classic Hoodie × 2 = CHF 179.80
- Gesamtbetrag: CHF 479.70
- Datum: 12.12.2025, 14:30
- Status: Bearbeitung

### 3. Kontaktformular (vorbereitet)
**An:** info@joumonde.com  
**Betreff:** "Neue Kontaktanfrage - Joumonde"  
**Inhalt:**
- Name: [Name]
- E-Mail: [E-Mail]
- Nachricht: [Nachricht]
- Datum: [Datum]

## ⚙️ E-Mail-Adresse ändern

Falls du eine andere E-Mail-Adresse verwenden möchtest:

1. Öffne `assets/js/account-system.js`
2. Suche nach: `https://formsubmit.co/info@joumonde.com`
3. Ersetze `info@joumonde.com` mit deiner E-Mail (erscheint 3x im Code)
4. Speichern
5. Erste Test-Registrierung durchführen
6. Neue E-Mail-Adresse bei FormSubmit bestätigen

## 🎨 E-Mail-Design anpassen

FormSubmit bietet verschiedene Templates:

**Standard (aktuell verwendet):**
```javascript
formData.append('_template', 'table');
```

**Alternativen:**
- `'box'` - Modern mit Rahmen
- `'basic'` - Einfach ohne Styling
- Eigenes Template möglich

## 🔧 Erweiterte Funktionen

### E-Mails an Kunden senden (zusätzlich)

Um auch dem **Kunden** eine Bestätigung zu senden:

1. Öffne `account-system.js`
2. Füge nach der Admin-Benachrichtigung hinzu:

```javascript
// E-Mail an Kunden
const customerFormData = new FormData();
customerFormData.append('_subject', 'Willkommen bei Joumonde!');
customerFormData.append('_template', 'table');
customerFormData.append('Hallo', user.firstName);
customerFormData.append('Nachricht', 'Vielen Dank für Ihre Registrierung!');

fetch(`https://formsubmit.co/${user.email}`, {
    method: 'POST',
    body: customerFormData
});
```

### Auto-Reply aktivieren

```javascript
formData.append('_autoresponse', 'Vielen Dank! Wir haben Ihre Anfrage erhalten.');
```

### CC/BCC hinzufügen

```javascript
formData.append('_cc', 'support@joumonde.com');
formData.append('_bcc', 'archiv@joumonde.com');
```

### Redirect nach E-Mail

```javascript
formData.append('_next', 'https://joumonde.com/danke');
```

## 📊 E-Mail-Tracking

Alle E-Mail-Versände werden in der Browser-Console geloggt:

```
✅ Registrierungs-E-Mail gesendet an info@joumonde.com
✅ Bestellbestätigungs-E-Mail gesendet an die Kundenadresse
```

Bei Fehlern:
```
⚠️ E-Mail-Versand fehlgeschlagen: [Fehler]
```

## 🆘 Problembehebung

### E-Mails kommen nicht an?

1. **Spam-Ordner prüfen** - FormSubmit-E-Mails landen oft im Spam
2. **E-Mail-Adresse bestätigen** - Erster Bestätigungslink muss geklickt werden
3. **Firewall/Adblocker** - Kann fetch() blockieren
4. **Browser-Console prüfen** - F12 → Console → Nach Fehlern suchen

### Bestätigungs-E-Mail nicht erhalten?

1. Warte 5-10 Minuten
2. Prüfe Spam-Ordner gründlich
3. Teste mit anderer E-Mail-Adresse
4. Verwende Gmail/Outlook statt eigener Domain

### E-Mails sehen komisch aus?

Template ändern:
```javascript
formData.append('_template', 'box'); // Statt 'table'
```

## 💡 Alternative: Eigener E-Mail-Server

Für mehr Kontrolle kannst du einen eigenen Backend-Server einrichten:

### Option 1: PHP (einfach)
```php
<?php
$to = "info@joumonde.com";
$subject = "Neue Registrierung";
$message = $_POST['message'];
mail($to, $subject, $message);
?>
```

### Option 2: Node.js + Nodemailer
```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'info@joumonde.com', pass: 'dein_passwort' }
});
```

### Option 3: E-Mail-Services
- **SendGrid** - 100 E-Mails/Tag kostenlos
- **Mailgun** - 1000 E-Mails/Monat kostenlos
- **Amazon SES** - Sehr günstig, komplex
- **Brevo (ehemals Sendinblue)** - 300 E-Mails/Tag kostenlos

## 📝 Zusammenfassung

**Aktuelles Setup:**
✅ FormSubmit kostenlos  
✅ Keine Registrierung nötig  
✅ Kein Backend erforderlich  
✅ Funktioniert sofort nach Bestätigung  
✅ Registrierungs-Benachrichtigungen  
✅ Bestellbestätigungen  
✅ Kontaktformular vorbereitet  

**Limits:**
- ~50 E-Mails/Tag kostenlos
- Nur ausgehende E-Mails
- Kein E-Mail-Verlauf
- Kein Dashboard

**Empfehlung:**
Für den Start ist FormSubmit perfekt! Wenn du später mehr brauchst (z.B. automatische Tracking-E-Mails, Newsletter-System), wechsle zu einem dedizierten E-Mail-Service wie Brevo oder SendGrid.

## 🎯 Nächste Schritte

1. ✅ Test-Registrierung durchführen
2. ✅ Bestätigungs-E-Mail von FormSubmit öffnen
3. ✅ Link klicken zum Aktivieren
4. ✅ System testen mit echten Registrierungen
5. ⏳ Bei Bedarf auf professionellen Service upgraden

---

**Support:** Bei Fragen einfach melden!  
**FormSubmit Docs:** https://formsubmit.co/  
**Status:** ✅ Einsatzbereit nach 1. Bestätigung
