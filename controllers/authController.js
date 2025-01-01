
const bcrypt = require('bcryptjs');
const { generateToken, regenerateToken } = require('../services/auth');

// Dummy user data (replace with a database in production)
const users = [{ id: 1, username: 'piotr', password: '$2b$10$Q4ZL8/FnQ1H1qxU13D.6NeHX86h0YFosE5EpQ0QC1nBhbstxSepEC' }];

const authenticate = async (req, res) => {
    // const { username, password } = req.body; // for POST
    const { username, password } = req.query; // for GET

    // Find user
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate and send token
    const token = generateToken(user);
    res.json({ token });
};

const refreshToken = (req, res) => {
    // const { token } = req.body;
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }

    const result = regenerateToken(token);

    if (result.success) {
        return res.json({ success: true, token: result.token });
    } else {
        return res.status(401).json({ success: false, message: result.message });
    }
};



// Protected Route (Example for API Key Authentication)
const protectedData = (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' });
    }
    res.json({ message: 'Here is your protected data!' });
};

// Example Protected Route (JWT)
const secureData = (req, res) => {
    res.json({ message: `Hello ${req.user.username}, here is your secure data!` });
};



module.exports = {
    authenticate,
    refreshToken,
    protectedData,
    secureData,
};