// Basic Express server for account system backend integration
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
// Passport config for Google
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'GOOGLE_CLIENT_SECRET',
        callbackURL: '/api/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        let user = users.find(u => u.email === profile.emails[0].value);
        if (!user) {
            user = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                verified: true,
                social: 'google'
            };
            users.push(user);
        }
        return done(null, user);
    }
));

// Passport config for Facebook
passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID || 'FB_CLIENT_ID',
        clientSecret: process.env.FB_CLIENT_SECRET || 'FB_CLIENT_SECRET',
        callbackURL: '/api/auth/facebook/callback',
        profileFields: ['id', 'emails', 'name']
    },
    function(accessToken, refreshToken, profile, done) {
        let email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.id}@facebook.com`;
        let user = users.find(u => u.email === email);
        if (!user) {
            user = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: email,
                verified: true,
                social: 'facebook'
            };
            users.push(user);
        }
        return done(null, user);
    }
));

app.use(passport.initialize());

// Google Auth Routes
app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/api/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.send('Google login successful!');
});

// Facebook Auth Routes
app.get('/api/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.send('Facebook login successful!');
});

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory user store (for demo only)
const users = [];
const user2FATokens = {};
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
// Enable 2FA (user requests to enable)
app.post('/api/enable-2fa', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Generate secret
    const secret = speakeasy.generateSecret({ name: `Joumonde (${email})` });
    user2FATokens[email] = secret.base32;
    // Generate QR code for authenticator apps
    qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) return res.status(500).json({ message: 'Failed to generate QR code' });
        res.json({ qr: data_url, secret: secret.base32 });
    });
});

// Verify 2FA code (during login or setup)
app.post('/api/verify-2fa', (req, res) => {
    const { email, token } = req.body;
    const secret = user2FATokens[email];
    if (!secret) return res.status(400).json({ message: '2FA not enabled' });
    const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token
    });
    if (verified) {
        // Mark user as 2FA enabled
        const user = users.find(u => u.email === email);
        if (user) user.twoFA = true;
        return res.json({ message: '2FA verified' });
    } else {
        return res.status(400).json({ message: 'Invalid 2FA code' });
    }
});
const verificationTokens = {};
const passwordResetTokens = {};
// Request password reset endpoint
app.post('/api/request-password-reset', (req, res) => {
    const { email } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    passwordResetTokens[email] = token;
    // Send reset email
    const resetLink = `http://localhost:${PORT}/api/reset-password?email=${encodeURIComponent(email)}&token=${token}`;
    transporter.sendMail({
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Hi,</p><p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    }, (err, info) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to send reset email', error: err.message });
        }
        res.json({ message: 'Password reset email sent.' });
    });
});

// Password reset endpoint (GET for link, POST for new password)
app.get('/api/reset-password', (req, res) => {
    const { email, token } = req.query;
    if (passwordResetTokens[email] === token) {
        // Show a simple HTML form for new password (for demo)
        res.send(`<form method='POST' action='/api/reset-password?email=${encodeURIComponent(email)}&token=${token}'><input type='password' name='newPassword' placeholder='New Password' required/><button type='submit'>Reset Password</button></form>`);
    } else {
        res.status(400).send('Invalid or expired token.');
    }
});

app.post('/api/reset-password', (req, res) => {
    const { email, token } = req.query;
    const { newPassword } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (passwordResetTokens[email] !== token) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }
    user.password = newPassword;
    delete passwordResetTokens[email];
    res.json({ message: 'Password has been reset successfully.' });
});

// Configure nodemailer (use your SMTP credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// Register endpoint with email verification
app.post('/api/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    verificationTokens[email] = token;
    users.push({ firstName, lastName, email, password, verified: false });

    // Send verification email
    const verificationLink = `http://localhost:${PORT}/api/verify-email?email=${encodeURIComponent(email)}&token=${token}`;
    transporter.sendMail({
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: email,
        subject: 'Verify your email',
        html: `<p>Hi ${firstName},</p><p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">${verificationLink}</a>`
    }, (err, info) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to send verification email', error: err.message });
        }
        res.status(201).json({ message: 'User registered. Verification email sent.' });
    });
});

// Email verification endpoint
app.get('/api/verify-email', (req, res) => {
    const { email, token } = req.query;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).send('Invalid email.');
    }
    if (user.verified) {
        return res.send('Email already verified.');
    }
    if (verificationTokens[email] === token) {
        user.verified = true;
        delete verificationTokens[email];
        return res.send('Email verified successfully!');
    } else {
        return res.status(400).send('Invalid or expired token.');
    }
});

// Login endpoint (only allow verified users, check 2FA if enabled)
app.post('/api/login', (req, res) => {
    const { email, password, token } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (!user.verified) {
        return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }
    if (user.twoFA) {
        const secret = user2FATokens[email];
        if (!token) {
            return res.status(206).json({ message: '2FA required' });
        }
        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token
        });
        if (!verified) {
            return res.status(401).json({ message: 'Invalid 2FA code' });
        }
    }
    res.json({ message: 'Login successful', user: { firstName: user.firstName, lastName: user.lastName, email: user.email, twoFA: !!user.twoFA } });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
