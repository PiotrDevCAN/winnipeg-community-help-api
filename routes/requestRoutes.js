const generateRoutes = require('../services/routeGenerator');
const requestController = require('../controllers/requestController');

const router = generateRoutes(requestController);

module.exports = router;
