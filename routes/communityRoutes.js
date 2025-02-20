const generateRoutes = require('../services/routeGenerator');
const communityController = require('../controllers/communityController');
const { verifyToken } = require('../middleware/verifyToken');

const router = generateRoutes(communityController);

// Add additional routes
router.get('/:id/offers', verifyToken, communityController.getCommunityOffers)
router.get('/:id/requests', verifyToken, communityController.getCommunityRequests)

module.exports = router;