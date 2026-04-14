// Basic Express server for account system backend integration
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
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

// Configure multer for profile picture uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed'));
        }
    }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// In-memory user store (for demo only)
const users = [];
const user2FATokens = {};
const orders = []; // Store orders
const giftCards = []; // Store gift cards
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

app.post('/api/reset-password', async (req, res) => {
    const { email, token } = req.query;
    const { newPassword } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (passwordResetTokens[email] !== token) {
        return res.status(400).json({ message: 'Invalid or expired token.' });
    }
    // Hash new password before storing
    user.password = await bcrypt.hash(newPassword, 10);
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
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    verificationTokens[email] = token;
    users.push({ firstName, lastName, email, password: hashedPassword, verified: false, bonusPoints: 0 });

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
app.post('/api/login', async (req, res) => {
    const { email, password, token } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Verify password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
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

// Upload profile picture
app.post('/api/upload-profile-picture', upload.single('profilePicture'), (req, res) => {
    const { email } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const user = users.find(u => u.email === email);
    if (!user) {
        // Clean up uploaded file if user not found
        fs.unlinkSync(req.file.path);
        return res.status(404).json({ message: 'User not found' });
    }
    // Delete old profile picture if exists
    if (user.profilePicture && fs.existsSync(path.join(uploadsDir, path.basename(user.profilePicture)))) {
        fs.unlinkSync(path.join(uploadsDir, path.basename(user.profilePicture)));
    }
    // Save new profile picture URL
    user.profilePicture = `/uploads/${req.file.filename}`;
    res.json({ message: 'Profile picture uploaded successfully', profilePicture: user.profilePicture });
});

// Get user profile (including profile picture)
app.get('/api/profile', (req, res) => {
    const { email } = req.query;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture || null,
        twoFA: !!user.twoFA
    });
});

// Create order and send confirmation email
app.post('/api/orders', (req, res) => {
    const { email, items, totalAmount, shippingAddress } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const order = {
        id: crypto.randomBytes(8).toString('hex'),
        email,
        items,
        totalAmount,
        shippingAddress,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    orders.push(order);
    
    // Send order confirmation email
    const itemsList = items.map(item => `${item.name} x${item.quantity} - €${item.price}`).join('<br>');
    transporter.sendMail({
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: email,
        subject: `Order Confirmation #${order.id}`,
        html: `
            <h2>Thank you for your order!</h2>
            <p>Hi ${user.firstName},</p>
            <p>Your order has been received and is being processed.</p>
            <h3>Order Details:</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Items:</strong><br>${itemsList}</p>
            <p><strong>Total:</strong> €${totalAmount}</p>
            <p><strong>Shipping Address:</strong><br>${shippingAddress}</p>
            <p>We'll send you another email when your order ships.</p>
            <p>Best regards,<br>Joumonde Team</p>
        `
    }, (err, info) => {
        if (err) {
            console.error('Failed to send order confirmation email:', err);
        }
    });
    
    res.status(201).json({ message: 'Order created', order });
});

// Update order status and send notification email
app.patch('/api/orders/:orderId/status', (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    order.status = status;
    order.updatedAt = new Date().toISOString();
    
    const user = users.find(u => u.email === order.email);
    if (user) {
        let subject = '';
        let message = '';
        
        switch(status) {
            case 'processing':
                subject = `Order Processing #${orderId}`;
                message = 'Your order is now being processed.';
                break;
            case 'shipped':
                subject = `Order Shipped #${orderId}`;
                message = 'Great news! Your order has been shipped and is on its way.';
                break;
            case 'delivered':
                subject = `Order Delivered #${orderId}`;
                message = 'Your order has been delivered. We hope you enjoy your purchase!';
                break;
            case 'cancelled':
                subject = `Order Cancelled #${orderId}`;
                message = 'Your order has been cancelled.';
                break;
            default:
                subject = `Order Status Update #${orderId}`;
                message = `Your order status has been updated to: ${status}`;
        }
        
        transporter.sendMail({
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: order.email,
            subject,
            html: `
                <h2>Order Status Update</h2>
                <p>Hi ${user.firstName},</p>
                <p>${message}</p>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Status:</strong> ${status}</p>
                <p>Best regards,<br>Joumonde Team</p>
            `
        }, (err, info) => {
            if (err) {
                console.error('Failed to send order status email:', err);
            }
        });
    }
    
    res.json({ message: 'Order status updated', order });
});

// Get orders for a user
app.get('/api/orders', (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    const userOrders = orders.filter(o => o.email === email);
    res.json({ orders: userOrders });
});

// Create gift card (admin only - should be protected in production)
app.post('/api/gift-cards/create', (req, res) => {
    const { amount, quantity } = req.body;
    if (!amount || !quantity) {
        return res.status(400).json({ message: 'Amount and quantity are required' });
    }
    const createdCards = [];
    for (let i = 0; i < quantity; i++) {
        const code = crypto.randomBytes(8).toString('hex').toUpperCase();
        const giftCard = {
            code,
            amount,
            balance: amount,
            isActive: true,
            createdAt: new Date().toISOString()
        };
        giftCards.push(giftCard);
        createdCards.push(code);
    }
    res.json({ message: `${quantity} gift card(s) created`, codes: createdCards });
});

// Redeem gift card
app.post('/api/gift-cards/redeem', (req, res) => {
    const { email, code } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const giftCard = giftCards.find(gc => gc.code === code && gc.isActive);
    if (!giftCard) {
        return res.status(404).json({ message: 'Invalid or inactive gift card' });
    }
    if (giftCard.balance <= 0) {
        return res.status(400).json({ message: 'Gift card has no remaining balance' });
    }
    // Convert gift card balance to bonus points (e.g., 1€ = 10 points)
    const pointsToAdd = giftCard.balance * 10;
    user.bonusPoints = (user.bonusPoints || 0) + pointsToAdd;
    giftCard.balance = 0;
    giftCard.isActive = false;
    giftCard.redeemedBy = email;
    giftCard.redeemedAt = new Date().toISOString();
    
    res.json({ 
        message: 'Gift card redeemed successfully', 
        pointsAdded: pointsToAdd,
        totalPoints: user.bonusPoints 
    });
});

// Get bonus points balance
app.get('/api/bonus-points', (req, res) => {
    const { email } = req.query;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ bonusPoints: user.bonusPoints || 0 });
});

// Redeem bonus points for discount
app.post('/api/bonus-points/redeem', (req, res) => {
    const { email, points } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (!user.bonusPoints || user.bonusPoints < points) {
        return res.status(400).json({ message: 'Insufficient bonus points' });
    }
    user.bonusPoints -= points;
    // Convert points to discount (e.g., 100 points = 1€ discount)
    const discountAmount = points / 100;
    
    res.json({ 
        message: 'Bonus points redeemed',
        pointsRedeemed: points,
        discountAmount: discountAmount.toFixed(2),
        remainingPoints: user.bonusPoints 
    });
});

// Add bonus points on order completion (called internally or by webhook)
app.post('/api/bonus-points/add', (req, res) => {
    const { email, orderAmount } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Award 1 point per 1€ spent
    const pointsToAdd = Math.floor(orderAmount);
    user.bonusPoints = (user.bonusPoints || 0) + pointsToAdd;
    
    res.json({ 
        message: 'Bonus points added',
        pointsAdded: pointsToAdd,
        totalPoints: user.bonusPoints 
    });
});

// Newsletter Management
const newsletterSubscribers = [];

// Newsletter subscription endpoint
app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
        const { email, name, source } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        // Check if already subscribed
        const existingSubscriber = newsletterSubscribers.find(sub => sub.email === email);
        if (existingSubscriber) {
            return res.status(409).json({ message: 'Email already subscribed' });
        }
        
        // Create subscriber
        const subscriber = {
            email: email.toLowerCase(),
            name: name || '',
            source: source || 'website',
            subscribed: new Date().toISOString(),
            confirmed: false,
            confirmationToken: crypto.randomBytes(32).toString('hex')
        };
        
        newsletterSubscribers.push(subscriber);
        
        // Send confirmation email
        const confirmationLink = `http://localhost:${PORT}/api/newsletter/confirm/${subscriber.confirmationToken}`;
        const emailContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #d4af37; font-size: 2rem; margin: 0;">Joumonde</h1>
                </div>
                
                <h2 style="color: #333;">Newsletter Anmeldung bestätigen</h2>
                
                <p style="color: #666; line-height: 1.6;">
                    Vielen Dank für dein Interesse an unserem Newsletter!
                </p>
                
                <p style="color: #666; line-height: 1.6;">
                    Bitte bestätige deine E-Mail-Adresse, um exklusive Angebote, Neuigkeiten und Updates zu erhalten.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${confirmationLink}" 
                       style="display: inline-block; padding: 15px 30px; background: #d4af37; color: #1a1a1a; text-decoration: none; border-radius: 4px; font-weight: bold;">
                        Newsletter bestätigen
                    </a>
                </div>
                
                <p style="color: #999; font-size: 0.9rem; line-height: 1.6;">
                    Wenn du diese Anmeldung nicht vorgenommen hast, ignoriere diese E-Mail einfach.
                </p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <p style="color: #999; font-size: 0.85rem; text-align: center;">
                    © ${new Date().getFullYear()} Joumonde - Premium Fashion<br>
                    <a href="https://joumonde.com" style="color: #d4af37; text-decoration: none;">joumonde.com</a>
                </p>
            </div>
        `;
        
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER || 'noreply@joumonde.com',
                to: email,
                subject: 'Newsletter Anmeldung bestätigen - Joumonde',
                html: emailContent
            });
        } catch (emailError) {
            console.error('Error sending confirmation email:', emailError);
            // Don't fail the subscription if email fails
        }
        
        res.json({ 
            message: 'Subscription successful! Please check your email to confirm.',
            requiresConfirmation: true
        });
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ message: 'Server error during subscription' });
    }
});

// Confirm newsletter subscription
app.get('/api/newsletter/confirm/:token', (req, res) => {
    const { token } = req.params;
    
    const subscriber = newsletterSubscribers.find(sub => sub.confirmationToken === token);
    
    if (!subscriber) {
        return res.status(404).send(`
            <html>
                <head>
                    <title>Bestätigung fehlgeschlagen - Joumonde</title>
                    <style>body { font-family: Arial; text-align: center; padding: 50px; }</style>
                </head>
                <body>
                    <h1 style="color: #c0392b;">❌ Bestätigung fehlgeschlagen</h1>
                    <p>Dieser Bestätigungslink ist ungültig oder abgelaufen.</p>
                    <a href="https://joumonde.com" style="color: #d4af37;">Zurück zur Homepage</a>
                </body>
            </html>
        `);
    }
    
    subscriber.confirmed = true;
    subscriber.confirmedAt = new Date().toISOString();
    
    res.send(`
        <html>
            <head>
                <title>Newsletter bestätigt - Joumonde</title>
                <style>body { font-family: Arial; text-align: center; padding: 50px; }</style>
            </head>
            <body>
                <h1 style="color: #d4af37;">✓ Newsletter bestätigt!</h1>
                <p>Vielen Dank! Du erhältst ab sofort exklusive Updates und Angebote von Joumonde.</p>
                <a href="https://joumonde.com" style="color: #d4af37; text-decoration: none; font-weight: bold;">Zurück zur Homepage</a>
            </body>
        </html>
    `);
});

// Unsubscribe from newsletter
app.post('/api/newsletter/unsubscribe', (req, res) => {
    const { email } = req.body;
    
    const index = newsletterSubscribers.findIndex(sub => sub.email === email.toLowerCase());
    
    if (index === -1) {
        return res.status(404).json({ message: 'Email not found in subscribers' });
    }
    
    newsletterSubscribers.splice(index, 1);
    res.json({ message: 'Successfully unsubscribed from newsletter' });
});

// Get newsletter statistics (admin only)
app.get('/api/newsletter/stats', (req, res) => {
    const stats = {
        total: newsletterSubscribers.length,
        confirmed: newsletterSubscribers.filter(sub => sub.confirmed).length,
        pending: newsletterSubscribers.filter(sub => !sub.confirmed).length,
        sources: {}
    };
    
    newsletterSubscribers.forEach(sub => {
        stats.sources[sub.source] = (stats.sources[sub.source] || 0) + 1;
    });
    
    res.json(stats);
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
