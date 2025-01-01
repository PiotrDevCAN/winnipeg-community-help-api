const generateRoutes = require('../services/routeGenerator');
const helpCategoryController = require('../controllers/helpCategoryController');

module.exports = generateRoutes(helpCategoryController);
