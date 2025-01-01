const generateRoutes = require('../services/routeGenerator');
const offerController = require('../controllers/offerController');

const router = generateRoutes(offerController);

module.exports = router;
