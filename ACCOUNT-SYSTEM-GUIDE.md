# Joumonde Account System - Benutzerhandbuch

## 📋 Übersicht

Das Account-System ermöglicht Benutzern die Erstellung von Konten, Anmeldung, Verwaltung von Adressen, Bestellverlauf und persönlichen Einstellungen.

## ✨ Features

### 1. Benutzerregistrierung
- **Vorname & Nachname**: Erforderlich
- **E-Mail**: Muss gültig sein und darf nicht bereits registriert sein
- **Passwort**: Mindestens 6 Zeichen
- **Newsletter-Abonnement**: Optional
- **AGB & Datenschutz**: Akzeptanz erforderlich

**Validierung:**
- Überprüft auf leere Felder
- Passwörter müssen übereinstimmen
- E-Mail-Format wird validiert
- Duplikate werden erkannt

### 2. Benutzeranmeldung
- **E-Mail & Passwort**: Authentifizierung
- **"Angemeldet bleiben"**: Session-Persistenz
- **Passwort vergessen**: Link vorhanden (Backend erforderlich)

### 3. Account Dashboard

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

### 4. Checkout-Integration
- **Auto-Fill**: Formulare werden mit Benutzerdaten vorausgefüllt
- **Standard-Adresse**: Automatisch ausgewählt
- **Bestellhistorie**: Alle Käufe werden gespeichert

### 5. Sicherheit
- **Passwort-Hashing**: Einfache Base64-Verschlüsselung (⚠️ Für Produktion verbessern!)
- **Session-Management**: localStorage mit "Angemeldet bleiben"-Option
- **Logout-Funktion**: Sicheres Abmelden

## 🔧 Technische Details

### localStorage-Struktur

```javascript
// Aktueller Benutzer
{
  "currentUser": {
    "id": "1640000000000",
    "firstName": "Max",
    "lastName": "Mustermann",
    "email": "max@example.com",
    "password": "hashed_password",
    "addresses": [...],
    "orderHistory": [...],
    "preferences": {...}
  }
}

// Alle Benutzer
{
  "allUsers": [
    {...user1},
    {...user2}
  ]
}

// Remember Me
{
  "rememberMe": "true"
}
```

### User-Klasse

```javascript
class User {
  id: string              // Timestamp-basiert
  firstName: string
  lastName: string
  email: string
  password: string        // Gehashed
  createdAt: string       // ISO Datum
  addresses: Address[]
  orderHistory: Order[]
  preferences: {
    newsletter: boolean
    defaultSize: string | null
    defaultCurrency: string
    defaultLanguage: string
  }
  wishlist: []
  savedPaymentMethods: []
}
```

### Wichtige Funktionen

#### Registrierung
```javascript
handleRegister(event)
- Validiert Formulardaten
- Erstellt neuen User
- Speichert in localStorage
- Auto-Login nach Registrierung
```

#### Login
```javascript
handleLogin(event)
- Findet Benutzer per E-Mail
- Verifiziert Passwort
- Setzt currentUser
- Aktualisiert UI
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

### Benutzer registrieren
1. Klick auf Account-Button
2. Wechsel zu "Registrieren"-Tab
3. Formular ausfüllen
4. Klick auf "Registrieren"
→ Auto-Login + Willkommens-Notification

### Anmelden
1. Klick auf Account-Button
2. E-Mail & Passwort eingeben
3. Optional: "Angemeldet bleiben" aktivieren
4. Klick auf "Anmelden"
→ Dashboard öffnet sich

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
**⚠️ WARNUNG**: Das aktuelle Passwort-Hashing (Base64) ist NICHT sicher für Produktionsumgebungen!

**Für Produktion empfohlen:**
- bcrypt.js für Passwort-Hashing
- Backend-Authentifizierung
- JWT für Sessions
- HTTPS obligatorisch

### localStorage-Limits
- Maximale Größe: ~5-10MB je Browser
- Keine Verschlüsselung
- Nicht für sensible Daten

### Browser-Kompatibilität
- Alle modernen Browser unterstützt
- localStorage erforderlich
- JavaScript aktiviert

## 🐛 Fehlerbehebung

### "E-Mail bereits registriert"
→ Diese E-Mail ist schon in Verwendung. Andere E-Mail nutzen oder anmelden.

### "Passwörter stimmen nicht überein"
→ Passwort und Passwortwiederholung müssen identisch sein.

### "Passwort muss mindestens 6 Zeichen lang sein"
→ Längeres Passwort wählen.

### Dashboard öffnet sich nicht
→ Browser-Konsole prüfen (F12), JavaScript-Fehler suchen.

### Daten gehen verloren
→ localStorage wird beim Browser-Cache-Löschen gelöscht.
→ "Angemeldet bleiben" aktivieren für Session-Persistenz.

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

**Geplante Features:**
- Backend-Integration (Node.js/PHP)
- E-Mail-Verifizierung
- Passwort-Reset per E-Mail
- Soziale Login-Optionen (Google, Facebook)
- Zwei-Faktor-Authentifizierung
- Bestellstatus-E-Mails
- Profilbild-Upload
- Bonuspunkte-System
- Geschenkkarten

## 📞 Support

Bei Fragen oder Problemen:
- Entwickler kontaktieren
- Browser-Konsole prüfen (F12)
- localStorage inspizieren:
  ```javascript
  console.log(localStorage.getItem('currentUser'));
  console.log(localStorage.getItem('allUsers'));
  ```

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: Januar 2025  
**Autor**: GitHub Copilot für Joumonde
