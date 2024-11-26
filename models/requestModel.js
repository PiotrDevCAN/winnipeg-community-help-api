const db = require('../services/dbConnection');

const Request = {
    getAllRequests: (callback) => {
        db.query('SELECT * FROM requests', callback);
    },

    getRequestById: (id, callback) => {
        db.query('SELECT * FROM requests WHERE id = ?', [id], callback);
    },

    createRequest: (title, description, callback) => {
        db.query(
            'INSERT INTO requests (title, description) VALUES (?, ?)',
            [title, description],
            callback
        );
    },

    updateRequest: (id, title, description, completed, callback) => {
        db.query(
            'UPDATE requests SET title = ?, description = ?, completed = ? WHERE id = ?',
            [title, description, completed, id],
            callback
        );
    },

    deleteRequest: (id, callback) => {
        db.query('DELETE FROM requests WHERE id = ?', [id], callback);
    },
};

module.exports = Request;
