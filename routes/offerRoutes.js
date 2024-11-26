const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const offerController = require('../controllers/offerController');

router.get('/', verifyToken, offerController.getAllRecords);
router.get('/:id', verifyToken, offerController.getRecordById);
router.post('/', verifyToken, offerController.createRecord);
router.put('/:id', verifyToken, offerController.updateRecord);
router.delete('/:id', verifyToken, offerController.deleteRecord);

module.exports = router;
