const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Konfiguration für Namecheap Private Email (ersetze durch deine Zugangsdaten)
const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'info@joumonde.com', // Deine E-Mail-Adresse
        pass: 'DEIN_EMAIL_PASSWORT' // Dein Passwort
    }
});

// Hilfsfunktion für Bestätigungs-E-Mail
function sendConfirmationMail(to, name) {
    return transporter.sendMail({
        from: 'info@joumonde.com',
        to,
        subject: 'Deine Anfrage bei Joumonde',
        text: `Hallo${name ? ' ' + name : ''},\n\nvielen Dank für deine Nachricht/Registrierung bei Joumonde! Wir melden uns so schnell wie möglich.\n\nDein Joumonde Team`,
    });
}

// Kontaktformular, Newsletter, Review etc.
app.post('/register', async (req, res) => {
    const { email, name, message, type, ...rest } = req.body;
    try {
        // E-Mail an info@joumonde.com
        await transporter.sendMail({
            from: 'info@joumonde.com',
            to: 'info@joumonde.com',
            subject: `Neue ${type || 'Anfrage'} über die Website`,
            text: `Neue Anfrage/Registrierung:\nName: ${name || '-'}\nE-Mail: ${email}\nNachricht: ${message || '-'}\nDaten: ${JSON.stringify(rest, null, 2)}`,
        });
        // Bestätigungs-E-Mail an Absender
        if (email) await sendConfirmationMail(email, name);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3001, () => console.log('Backend läuft auf Port 3001'));
