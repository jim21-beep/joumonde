// Basic Express server for account system backend integration
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// In-memory user store (for demo only)
const users = [];

// Register endpoint
app.post('/api/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ firstName, lastName, email, password });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
