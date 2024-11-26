const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const requestController = require('../controllers/requestController');

router.get('/', verifyToken, requestController.getAllRecords);
router.get('/:id', verifyToken, requestController.getRecordById);
router.post('/', verifyToken, requestController.createRecord);
router.put('/:id', verifyToken, requestController.updateRecord);
router.delete('/:id', verifyToken, requestController.deleteRecord);

module.exports = router;
