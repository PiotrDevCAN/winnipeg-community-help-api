const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const requestController = require('../controllers/requestController');

router.get('/', verifyToken, requestController.getAllRequests);
router.get('/:id', verifyToken, requestController.getRequestById);
router.post('/', verifyToken, requestController.createRequest);
router.put('/:id', verifyToken, requestController.updateRequest);
router.delete('/:id', verifyToken, requestController.deleteRequest);

module.exports = router;
