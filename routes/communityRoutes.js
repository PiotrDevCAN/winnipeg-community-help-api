const generateRoutes = require('../services/routeGenerator');
const communityController = require('../controllers/communityController');
const { verifyToken } = require('../middleware/verifyToken');

const router = generateRoutes(communityController);

// Add additional routes
router.get('/:community_id/offers', verifyToken, communityController.getOffersInCommunity)
router.get('/:community_id/requests', verifyToken, communityController.getRequestsInCommunity)

module.exports = router;