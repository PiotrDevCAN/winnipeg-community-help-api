const generateRoutes = require('../services/routeGenerator');
const mainCommunityController = require('../controllers/mainCommunityController');

const router = generateRoutes(mainCommunityController);

module.exports = router;
