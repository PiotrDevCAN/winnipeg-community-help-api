const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const oAuthController = require('../controllers/oAuthController');

const { authenticateToken } = require('../middleware/authenticateToken');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/authenticate', authController.authenticate);
router.post('/refresh-token', authController.refreshToken);
router.post('/secure-data', authenticateToken, authController.secureData);
router.post('/protected-data', authController.protectedData);

router.post('/authenticate-oauth', oAuthController.authenticate);
router.post('/refresh-token-oauth', oAuthController.refreshToken);
router.post('/secure-data-oauth', verifyToken, authController.secureData);

module.exports = router;