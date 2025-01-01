const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');

const generateRoutes = (controller, middlewares = [verifyToken]) => {
    const router = express.Router();

    router.get('/', ...middlewares, controller.getAllRecords);
    router.get('/:id', ...middlewares, controller.getRecordById);
    router.post('/', ...middlewares, controller.createRecord);
    router.put('/:id', ...middlewares, controller.updateRecord);
    router.delete('/:id', ...middlewares, controller.deleteRecord);

    return router;
};

module.exports = generateRoutes;
