const generateRoutes = require('../services/routeGenerator');
const helpTypeController = require('../controllers/helpTypeController');

const router = generateRoutes(helpTypeController);

module.exports = router;
