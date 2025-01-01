const generateRoutes = require('../services/routeGenerator');
const volunteerController = require('../controllers/volunteerController');
const { verifyToken } = require('../middleware/verifyToken');

const router = generateRoutes(volunteerController);

// Add additional routes
router.get('/list/community/:community_id', verifyToken, volunteerController.getVolunteersInCommunity)

module.exports = router;
