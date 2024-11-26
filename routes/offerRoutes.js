const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const offerController = require('../controllers/offerController');

router.get('/', verifyToken, offerController.getAllOffers);
router.get('/:id', verifyToken, offerController.getOfferById);
router.post('/', verifyToken, offerController.createOffer);
router.put('/:id', verifyToken, offerController.updateOffer);
router.delete('/:id', verifyToken, offerController.deleteOffer);

module.exports = router;
