const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const helpTypeController = require('../controllers/helpTypeController');

router.get('/', verifyToken, helpTypeController.getAllRecords);
router.get('/:id', verifyToken, helpTypeController.getRecordById);
router.post('/', verifyToken, helpTypeController.createRecord);
router.put('/:id', verifyToken, helpTypeController.updateRecord);
router.delete('/:id', verifyToken, helpTypeController.deleteRecord);

module.exports = router;
