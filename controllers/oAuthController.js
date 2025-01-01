const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../services/oAuth');

// Dummy user data (replace with a database in production)
const users = [{ id: 1, username: 'piotr', password: '$2b$10$a9V3bo1fd9G2CoOzwshL2.HzGvxGUjd4Ir8nsTu6zlT/HMDJNVi8G' }];

const authenticate = async (req, res) => {
    const { username, password } = req.body; // for POST
    // const { username, password } = req.query; // for GET

    // Find user
    const user = users.find((u) => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // bcrypt.compare expects:

    // First argument: Plain text password.
    // Second argument: Hashed password.

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Optionally, store the refresh token in a database for security
    // await saveRefreshToken(user.id, refreshToken);

    res.json({
        accessToken,
        refreshToken,
    });
};

const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    // const { refreshToken } = req.query;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken({ id: user.id, username: user.username });

        res.json({
            accessToken: newAccessToken,
        });
    });
};

module.exports = {
    authenticate,
    refreshToken,
};