const generateRoutes = require('../services/routeGenerator');
const needyController = require('../controllers/needyController');
const { verifyToken } = require('../middleware/verifyToken');

const router = generateRoutes(needyController);

// Add additional routes
router.get('/list/community/:community_id', verifyToken, needyController.getNeedyPeopleInCommunity)
router.get('/:id/offers', verifyToken, needyController.getNeedyOffers)
router.get('/:id/requests', verifyToken, needyController.getNeedyRequests)

module.exports = router;
