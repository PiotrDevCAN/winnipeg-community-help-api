const generateRoutes = require('../services/routeGenerator');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

const router = generateRoutes(userController);

// Add additional routes
router.get('/firebase/:firebase_id', verifyToken, userController.getRecordByFirebaseId)
router.get('/list/community/:community_id', verifyToken, userController.getUsersInCommunity)
router.get('/:id/requests', verifyToken, userController.getUserRequests)
router.get('/:id/offers', verifyToken, userController.getUserOffers)

module.exports = router;
