# Newsletter System Documentation

## Overview
The Joumonde newsletter system allows visitors to subscribe to promotional emails and updates. It includes email confirmation, unsubscribe functionality, and admin statistics.

## Features
- ✅ Email subscription with validation
- ✅ Double opt-in (email confirmation required)
- ✅ Unsubscribe functionality
- ✅ Admin statistics dashboard
- ✅ Source tracking (coming-soon page, footer, etc.)
- ✅ Multi-language support
- ✅ Analytics tracking integration

## Backend Endpoints

### 1. Subscribe to Newsletter
**POST** `/api/newsletter/subscribe`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "Optional Name",
  "source": "footer-newsletter"
}
```

**Response:**
```json
{
  "message": "Subscription successful! Please check your email to confirm.",
  "requiresConfirmation": true
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid email format
- `409`: Email already subscribed
- `500`: Server error

### 2. Confirm Subscription
**GET** `/api/newsletter/confirm/:token`

Confirmation link sent via email. Opens a webpage confirming subscription.

### 3. Unsubscribe
**POST** `/api/newsletter/unsubscribe`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Successfully unsubscribed from newsletter"
}
```

### 4. Newsletter Statistics (Admin)
**GET** `/api/newsletter/stats`

**Response:**
```json
{
  "total": 150,
  "confirmed": 120,
  "pending": 30,
  "sources": {
    "coming-soon-page": 80,
    "footer-newsletter": 70
  }
}
```

## Frontend Integration

### HTML Forms
Newsletter forms use the `onsubmit` handler:

**Coming Soon Page:**
```html
<form onsubmit="handleNewsletterSignup(event)">
  <input type="email" required>
  <button type="submit">Abonnieren</button>
</form>
```

**Shop/About/Product Pages:**
```html
<form class="newsletter-form" onsubmit="submitNewsletter(event)">
  <input type="email" id="newsletter-email" required>
  <button type="submit">Abonnieren</button>
</form>
```

### JavaScript Functions

**`submitNewsletter(e)`** - Used in shop.html, about.html, product-detail.html
- Validates email
- Shows loading state
- Sends POST request to backend
- Tracks with Google Analytics
- Displays success/error notifications

**`handleNewsletterSignup(event)`** - Used in index.html (coming soon page)
- Similar functionality to submitNewsletter
- Tailored for coming-soon page context

## Email Templates

### Confirmation Email
Sent when user subscribes. Contains:
- Welcome message
- Confirmation button/link
- Joumonde branding
- Unsubscribe notice

### Confirmation Page
After clicking confirmation link, user sees:
- Success message
- Link back to homepage
- Confirmation timestamp

## Configuration

### Environment Variables
Set in `.env` file or environment:

```bash
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=4000
```

### SMTP Configuration
Uses nodemailer with Gmail by default. Edit `backend/server.js` to change provider:

```javascript
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## Data Storage

**In-Memory (Development):**
Subscribers stored in `newsletterSubscribers` array.

**For Production:**
Replace with database:
- MongoDB, PostgreSQL, MySQL
- Add persistence layer
- Implement proper data backup

## Analytics Tracking

Newsletter signups are tracked with Google Analytics:
```javascript
trackNewsletterSignup(email);
```

Events tracked:
- `newsletter_signup` - When user submits email
- Includes email and source

## Unsubscribe Page

**URL:** `/newsletter-unsubscribe.html`

Features:
- Email input form
- Validation
- Success/error messages
- Link back to homepage

## Admin Dashboard

**View Statistics:**
```bash
curl http://localhost:4000/api/newsletter/stats
```

## Testing

### Test Subscription
```bash
curl -X POST http://localhost:4000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","source":"test"}'
```

### Test Unsubscribe
```bash
curl -X POST http://localhost:4000/api/newsletter/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Common Issues

### Emails Not Sending
1. Check EMAIL_USER and EMAIL_PASS environment variables
2. Enable "Less secure app access" for Gmail (or use App Password)
3. Check firewall/port blocking
4. Review backend logs for errors

### Confirmation Links Not Working
1. Ensure backend server is running on correct port
2. Check token generation/storage
3. Verify URL in email template

### CORS Issues
If frontend can't reach backend:
```javascript
app.use(cors({
    origin: ['http://localhost:3000', 'https://joumonde.com'],
    credentials: true
}));
```

## Security Considerations

1. **Rate Limiting**: Add rate limiting to prevent spam
2. **Email Validation**: Server-side validation implemented
3. **SQL Injection**: Use parameterized queries when adding database
4. **GDPR Compliance**: Store only necessary data, allow data export/deletion
5. **Spam Protection**: Consider adding CAPTCHA for public forms

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] Email templates with customization
- [ ] Segmentation by interests/preferences
- [ ] A/B testing for email campaigns
- [ ] Send newsletter campaigns from admin panel
- [ ] Subscriber management dashboard
- [ ] Export subscribers to CSV
- [ ] Integration with Mailchimp/SendGrid
- [ ] CAPTCHA for spam protection
- [ ] Rate limiting

## File References

**Backend:**
- `backend/server.js` - Newsletter API endpoints

**Frontend:**
- `assets/js/script.js` - submitNewsletter()
- `assets/js/coming-soon.js` - handleNewsletterSignup()
- `newsletter-unsubscribe.html` - Unsubscribe page

**HTML Forms:**
- `index.html` - Coming soon newsletter
- `shop.html` - Footer newsletter
- `about.html` - Footer newsletter
- `product-detail.html` - Footer newsletter
