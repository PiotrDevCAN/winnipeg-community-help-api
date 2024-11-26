const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const volunteerController = require('../controllers/volunteerController');

router.get('/', verifyToken, volunteerController.getAllVolunteers);
router.get('/:id', verifyToken, volunteerController.getVolunteerById);
router.post('/', verifyToken, volunteerController.createVolunteer);
router.put('/:id', verifyToken, volunteerController.updateVolunteer);
router.delete('/:id', verifyToken, volunteerController.deleteVolunteer);

module.exports = router;
