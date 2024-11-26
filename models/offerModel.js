const db = require('../services/dbConnection');

const Offer = {
    getAllOffers: (callback) => {
        db.query('SELECT * FROM offers', callback);
    },

    getOfferById: (id, callback) => {
        db.query('SELECT * FROM offers WHERE id = ?', [id], callback);
    },

    createOffer: (title, description, callback) => {
        db.query(
            'INSERT INTO offers (title, description) VALUES (?, ?)',
            [title, description],
            callback
        );
    },

    updateOffer: (id, title, description, completed, callback) => {
        db.query(
            'UPDATE offers SET title = ?, description = ?, completed = ? WHERE id = ?',
            [title, description, completed, id],
            callback
        );
    },

    deleteOffer: (id, callback) => {
        db.query('DELETE FROM offers WHERE id = ?', [id], callback);
    },
};

module.exports = Offer;
