const db = require('../services/dbPool');

const mainCommunity = {
    getAllRecords: async () => {
        try {
            const [results] = await db.query('SELECT * FROM main_communities');
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    getRecordById: async (id) => {
        try {
            const [results] = await db.query('SELECT * FROM main_communities WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    createRecord: async (title, description, callback) => {
        try {
            const [results] = await db.query(
                'INSERT INTO main_communities (title, description) VALUES (?, ?)',
                [title, description]
            );
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    updateRecord: async (id, title, description, completed) => {
        try {
            const [results] = await db.query(
                'UPDATE main_communities SET title = ?, description = ?, completed = ? WHERE id = ?',
                [title, description, completed, id]
            );
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    deleteRecord: async (id) => {
        try {
            const [results] = await db.query('DELETE FROM main_communities WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },
};

module.exports = mainCommunity;
