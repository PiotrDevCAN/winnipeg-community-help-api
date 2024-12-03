const jwt = require('jsonwebtoken');

// Generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Access tokens are short-lived
    );
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' } // Refresh tokens are long-lived
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};