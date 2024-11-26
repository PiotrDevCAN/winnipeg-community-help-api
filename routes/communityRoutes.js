const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const communityController = require('../controllers/communityController');

router.get('/', verifyToken, communityController.getAllCommunities);
router.get('/:id', verifyToken, communityController.getCommunityById);
router.post('/', verifyToken, communityController.createCommunity);
router.put('/:id', verifyToken, communityController.updateCommunity);
router.delete('/:id', verifyToken, communityController.deleteCommunity);

module.exports = router;
