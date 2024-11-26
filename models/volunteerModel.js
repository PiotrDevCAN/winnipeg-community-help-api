const db = require('../services/dbConnection');

const Volunteer = {
    getAllVolunteers: (callback) => {
        db.query('SELECT * FROM volunteers', callback);
    },

    getVolunteerById: (id, callback) => {
        db.query('SELECT * FROM volunteers WHERE id = ?', [id], callback);
    },

    createVolunteer: (title, description, callback) => {
        db.query(
            'INSERT INTO volunteers (title, description) VALUES (?, ?)',
            [title, description],
            callback
        );
    },

    updateVolunteer: (id, title, description, completed, callback) => {
        db.query(
            'UPDATE volunteers SET title = ?, description = ?, completed = ? WHERE id = ?',
            [title, description, completed, id],
            callback
        );
    },

    deleteVolunteer: (id, callback) => {
        db.query('DELETE FROM volunteers WHERE id = ?', [id], callback);
    },
};

module.exports = Volunteer;
