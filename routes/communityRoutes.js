const generateRoutes = require('../services/routeGenerator');
const communityController = require('../controllers/communityController');

const router = generateRoutes(communityController);

module.exports = router;