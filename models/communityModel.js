const db = require('../services/dbConnection');

const Community = {
    getAllCommunities: (callback) => {
        db.query('SELECT * FROM communities', callback);
    },

    getCommunityById: (id, callback) => {
        db.query('SELECT * FROM communities WHERE id = ?', [id], callback);
    },

    createCommunity: (title, description, callback) => {
        db.query(
            'INSERT INTO communities (title, description) VALUES (?, ?)',
            [title, description],
            callback
        );
    },

    updateCommunity: (id, title, description, completed, callback) => {
        db.query(
            'UPDATE communities SET title = ?, description = ?, completed = ? WHERE id = ?',
            [title, description, completed, id],
            callback
        );
    },

    deleteCommunity: (id, callback) => {
        db.query('DELETE FROM communities WHERE id = ?', [id], callback);
    },
};

module.exports = Community;
