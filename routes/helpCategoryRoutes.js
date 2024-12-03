const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const helpCategoryController = require('../controllers/helpCategoryController');

router.get('/', verifyToken, helpCategoryController.getAllRecords);
router.get('/:id', verifyToken, helpCategoryController.getRecordById);
router.post('/', verifyToken, helpCategoryController.createRecord);
router.put('/:id', verifyToken, helpCategoryController.updateRecord);
router.delete('/:id', verifyToken, helpCategoryController.deleteRecord);

module.exports = router;
