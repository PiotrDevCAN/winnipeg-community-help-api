const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const volunteerController = require('../controllers/volunteerController');

router.get('/', verifyToken, volunteerController.getAllRecords);
router.get('/:id', verifyToken, volunteerController.getRecordById);
router.post('/', verifyToken, volunteerController.createRecord);
router.put('/:id', verifyToken, volunteerController.updateRecord);
router.delete('/:id', verifyToken, volunteerController.deleteRecord);

module.exports = router;
