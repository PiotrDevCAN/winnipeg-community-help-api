// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

// Generate Token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

const regenerateToken = (oldToken) => {
    try {
        // Verify the old token (ignoring expiration to allow refreshing expired tokens)
        const payload = jwt.verify(oldToken, process.env.JWT_SECRET, { ignoreExpiration: true });

        // Generate a new token with the same payload but a new expiration time
        const newToken = jwt.sign(
            { id: payload.id, username: payload.username }, // Keep payload the same
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // New expiration time
        );

        return { success: true, token: newToken };
    } catch (error) {
        console.error('Error refreshing token:', error.message);
        return { success: false, message: 'Invalid or expired token' };
    }
};

export { generateToken, regenerateToken };