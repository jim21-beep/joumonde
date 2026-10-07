# Joumonde Account System - Benutzerhandbuch

## Übersicht

Das Account-System verwendet Supabase Auth für die passwortlose Anmeldung sowie Supabase-Datenbanktabellen für Profile, Adressen und Bestellungen.

## ✨ Features

### 1. Registrierung und Anmeldung
- Neue und bestehende Benutzer geben ihre E-Mail-Adresse auf `account.html` ein.
- Die Edge Function `email-login-code` sendet einen sechsstelligen Einmalcode; es gibt kein Passwort und keinen separaten Registrierungsablauf.
- Der Code wird direkt auf `account.html` eingegeben. Der Server prüft ihn einmalig und tauscht ihn anschließend gegen einen kurzlebigen Supabase-Magic-Link-Token, mit dem der Browser eine normale Supabase-Session erhält.
- Alternativ ist Google OAuth verfügbar.
- Der Shop verwendet den E-Mail-Code-Ablauf für die Anmeldung.

#### Deployment des eigenen Codes
1. Die Migration `supabase/migrations/20261007203000_email_login_codes.sql` im Supabase SQL Editor ausführen.
2. Die Edge Function `email-login-code` in das Joumonde-Supabase-Projekt deployen.
3. Sicherstellen, dass die vorhandenen Function-Secrets `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` und `RESEND_API_KEY` für Edge Functions verfügbar sind.
4. Danach mit einem bestehenden Konto einen neuen Code anfordern und Anmeldung sowie erneute Codeanforderung testen.

Codes werden mit HMAC serverseitig geschützt gespeichert, laufen nach zehn Minuten ab, sind nur einmal verwendbar und erlauben höchstens fünf Prüfversuche. Pro E-Mail-Adresse gilt eine Versandpause von 60 Sekunden; zusätzlich werden Versand- und Prüfversuche pro IP begrenzt. Antworten auf Codeanforderungen verraten nicht, ob eine E-Mail-Adresse bereits registriert ist.

Der Code wird nicht von Supabase Auth erzeugt. Änderungen an Supabase’ Magic-Link-/OTP-Mailvorlage ändern daher diesen sechsstelligen Codeversand nicht.

### 2. Account Dashboard

#### **Übersicht-Tab**
Zeigt wichtige Statistiken:
- 📦 Anzahl der Bestellungen
- 💰 Gesamtausgaben
- ❤️ Anzahl Wunschlistenartikel

**Schnellzugriff:**
- Bestellungen ansehen
- Adressen verwalten
- Wunschliste öffnen

#### **Bestellungen-Tab**
- Vollständiger Bestellverlauf
- **Status-Tracking**:
  - 🟡 Bearbeitung
  - 🔵 Versandt
  - 🟢 Zugestellt
- Detailansicht jeder Bestellung
- Datum, Artikel, Preise

#### **Adressen-Tab**
- **Mehrere Adressen speichern**
- **Standard-Adresse** festlegen (gold markiert)
- **CRUD-Operationen**:
  - ➕ Neue Adresse hinzufügen
  - ✏️ Adresse bearbeiten
  - 🗑️ Adresse löschen
  - ⭐ Als Standard setzen

**Adressfelder:**
- Straße & Hausnummer
- PLZ
- Stadt
- Land (Standard: Schweiz)
- Telefon (optional)

#### **Einstellungen-Tab**
**Personalisierung:**
- **Standardgröße**: S, M, L, XL, XXL
- **Standardwährung**: CHF, EUR, USD
- **Standardsprache**: Deutsch, English, Français
- **Newsletter**: An/Aus

**Gefahrenzone:**
- ⚠️ Konto löschen (mit Bestätigung)

### 3. Checkout-Integration
- **Auto-Fill**: Formulare werden mit Benutzerdaten vorausgefüllt
- **Standard-Adresse**: Automatisch ausgewählt
- **Bestellhistorie**: Alle Käufe werden gespeichert

### 4. Sicherheit
- Die Authentifizierung und Session-Verwaltung erfolgen über Supabase Auth.
- Der Browser speichert keine Kontopasswörter.
- Einmalcodes sind zeitlich begrenzt, werden serverseitig geprüft und sind nur einmal verwendbar.

## 🔧 Technische Details

### Authentifizierung

`sendAccountLoginCode()` und `verifyAccountLoginCode()` verwenden die Edge Function `email-login-code` für den sechsstelligen Code. Nach erfolgreicher Prüfung erstellt der Server über Supabase Admin einen Magic-Link-Token; der Browser tauscht dessen Hash mit `supabase.auth.verifyOtp({ token_hash, type: 'email' })` in eine Supabase-Session um.

Die Supabase-Session wird weiterhin vollständig von Supabase Auth verwaltet und wiederhergestellt. Es werden keine Passwörter oder separaten lokalen Konten gespeichert. Der separate Code wird nur gehasht in der Datenbank gespeichert und nach erfolgreicher Prüfung gelöscht.

### Wichtige Funktionen

#### E-Mail-Code anfordern und prüfen
```javascript
sendAccountLoginCode()
verifyAccountLoginCode(event)
```

#### Dashboard
```javascript
showAccountDashboard()
- Generiert Dashboard-HTML dynamisch
- Zeigt Statistiken
- 4 Tabs: Übersicht, Bestellungen, Adressen, Einstellungen
```

#### Adressen-Verwaltung
```javascript
addAddress(address)      // Neue Adresse
updateAddress(id, data)  // Adresse bearbeiten
deleteAddress(id)        // Adresse löschen
setDefaultAddress(id)    // Standard setzen
```

#### Einstellungen
```javascript
updatePreferences(prefs)
- Speichert Präferenzen
- Wendet Währung/Sprache an
- Aktualisiert UI
```

## 🎨 UI-Komponenten

### Account-Button
- **Ausgeloggt**: Einfaches User-Icon
- **Eingeloggt**: User-Icon mit grünem Indikator
- **Tooltip**: Zeigt Name bei Login

### Benachrichtigungen
Toast-Notifications (rechts oben):
- ✅ **Success**: Grün
- ❌ **Error**: Rot
- ℹ️ **Info**: Blau

Auto-Ausblendung nach 3 Sekunden.

### Nachrichten
Im Modal angezeigte Nachrichten:
- Erscheint oben im Modal
- Verschwindet nach 3s (bei Fehlern)
- Bleibt sichtbar bei Erfolg

## 📱 Responsive Design

**Desktop (>768px):**
- Dashboard max-width: 900px
- Tabs horizontal scrollbar
- Adressen im Grid (3 Spalten)

**Mobile (<768px):**
- Tabs kompakter
- Stats untereinander
- Adressen einspaltiges Grid
- Bestellungen volle Breite

## ⚙️ Integration

### In HTML einbinden
```html
<script src="assets/js/script.js"></script>
<script src="assets/js/account-system.js"></script>
```

### Checkout-Integration
Das System überschreibt automatisch:
- `openCheckout()` - Füllt Formular vor
- `submitCheckout()` - Speichert Bestellung

### Bestehende Funktionen
Nutzt aus `script.js`:
- `cart` - Warenkorb-Array
- `wishlist` - Wunschlisten-Array
- `changeCurrency()` - Währungswechsel
- `changeLanguage()` - Sprachwechsel

## 🚀 Verwendung

### Anmelden
1. Account-Button öffnen.
2. E-Mail-Adresse eingeben und den Code anfordern.
3. Den sechsstelligen Code aus der E-Mail direkt auf `account.html` eingeben.
→ Supabase Auth meldet den Benutzer an und öffnet das Dashboard.

### Adresse hinzufügen
1. Dashboard → Adressen-Tab
2. "+ Neue Adresse hinzufügen"
3. Formular ausfüllen
4. "Speichern"
→ Erste Adresse wird automatisch als Standard gesetzt

### Bestellung aufgeben
1. Artikel in Warenkorb
2. Zur Kasse gehen
→ Formular ist vorausgefüllt mit Benutzerdaten
3. Bestellung abschließen
→ Wird in "Bestellungen" gespeichert

### Einstellungen ändern
1. Dashboard → Einstellungen-Tab
2. Präferenzen anpassen
3. "Einstellungen speichern"
→ Änderungen werden sofort angewendet

## ⚠️ Wichtige Hinweise

### Sicherheit
- Supabase Auth verwaltet Identitäten und Sessions.
- Der Browser speichert keine Kontopasswörter.
- Der Code wird serverseitig zeitlich begrenzt und geprüft; Fehlversuche sind begrenzt und erfolgreiche Codes sind nur einmal verwendbar.

### Browser-Kompatibilität
- Alle modernen Browser unterstützt
- JavaScript aktiviert

## 🐛 Fehlerbehebung

### "E-Mail bereits registriert"
→ Diese E-Mail ist schon in Verwendung. Andere E-Mail nutzen oder anmelden.

### Dashboard öffnet sich nicht
→ Browser-Konsole prüfen (F12), JavaScript-Fehler suchen.

## 📊 Analytics-Integration

Account-Events für Tracking:
- User-Registrierung
- User-Login
- Adresse hinzugefügt
- Bestellung abgeschlossen
- Einstellungen geändert
- Account gelöscht

Nutze Browser-Events für externe Analytics:
```javascript
// Beispiel: Google Analytics
window.dataLayer = window.dataLayer || [];
dataLayer.push({
  'event': 'user_registered',
  'user_id': user.id
});
```

## 🔮 Zukünftige Erweiterungen

**Mögliche spätere Erweiterungen:**
- Zwei-Faktor-Authentifizierung
- Profilbild-Upload
- Bonuspunkte-System
- Geschenkkarten

## 📞 Support

Bei Fragen oder Problemen:
- Entwickler kontaktieren
- Browser-Konsole prüfen (F12)

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: Oktober 2026
**Autor**: GitHub Copilot für Joumonde
