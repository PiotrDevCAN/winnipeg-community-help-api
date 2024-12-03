const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const mainCommunityController = require('../controllers/mainCommunityController');

router.get('/', verifyToken, mainCommunityController.getAllRecords);
router.get('/:id', verifyToken, mainCommunityController.getRecordById);
router.post('/', verifyToken, mainCommunityController.createRecord);
router.put('/:id', verifyToken, mainCommunityController.updateRecord);
router.delete('/:id', verifyToken, mainCommunityController.deleteRecord);

module.exports = router;
