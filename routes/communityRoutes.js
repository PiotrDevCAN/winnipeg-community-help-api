const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const communityController = require('../controllers/communityController');

router.get('/', verifyToken, communityController.getAllRecords);
router.get('/:id', verifyToken, communityController.getRecordById);
router.post('/', verifyToken, communityController.createRecord);
router.put('/:id', verifyToken, communityController.updateRecord);
router.delete('/:id', verifyToken, communityController.deleteRecord);

module.exports = router;
