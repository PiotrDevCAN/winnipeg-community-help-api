const Offer = require('../models/offerModel');

const getAllOffers = (req, res) => {
    Offer.getAllOffers((err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Offers' });
        } else {
            res.status(200).json(results);
        }
    });
};

const getOfferById = (req, res) => {
    const { id } = req.params;
    Offer.getOfferById(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve Offer' });
        } else if (result.length === 0) {
            res.status(404).json({ error: 'Offer not found' });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

const createOffer = (req, res) => {
    const { title, description } = req.body;
    Offer.createOffer(title, description, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to create Offer' });
        } else {
            res.status(201).json({ message: 'Offer created successfully', OfferId: result.insertId });
        }
    });
};

const updateOffer = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    Offer.updateOffer(id, title, description, completed, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update Offer' });
        } else {
            res.status(200).json({ message: 'Offer updated successfully' });
        }
    });
};

const deleteOffer = (req, res) => {
    const { id } = req.params;
    Offer.deleteOffer(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete Offer' });
        } else {
            res.status(200).json({ message: 'Offer deleted successfully' });
        }
    });
};

module.exports = {
    getAllOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
};
