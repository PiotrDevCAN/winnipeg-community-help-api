const generateRoutes = require('../services/routeGenerator');
const volunteerController = require('../controllers/volunteerController');
const { verifyToken } = require('../middleware/verifyToken');

const router = generateRoutes(volunteerController);

// Add additional routes
router.get('/list/community/:community_id', verifyToken, volunteerController.getVolunteersInCommunity)
router.get('/:id/offers', verifyToken, volunteerController.getVolunteerOffers)
router.get('/:id/requests', verifyToken, volunteerController.getVolunteerRequests)

module.exports = router;
