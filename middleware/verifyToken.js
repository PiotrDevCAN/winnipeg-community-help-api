// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    // 1. Get token from Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    // 2. Verify token using the ACCESS_TOKEN_SECRET
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err && err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        }

        if (err) {
            return res.status(403).json({ message: 'Invalid token - verifyToken' });
        }

        // 3. Attach user to request object if token is valid
        req.user = user; // The payload from the token (usually user info)

        // Call next middleware or route handler
        next();
    });
};

// export default verifyToken;
module.exports = {
    verifyToken
};