const db = require('../services/dbPool');

const Volunteer = {
    getAllRecords: async () => {
        try {
            const [results] = await db.query('SELECT * FROM volunteers');
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    getRecordById: async (id) => {
        try {
            const [results] = await db.query('SELECT * FROM volunteers WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    createRecord: async (title, description, callback) => {
        try {
            const [results] = await db.query(
                'INSERT INTO volunteers (title, description) VALUES (?, ?)',
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
                'UPDATE volunteers SET title = ?, description = ?, completed = ? WHERE id = ?',
                [title, description, completed, id]
            );
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    deleteRecord: async (id) => {
        try {
            const [results] = await db.query('DELETE FROM volunteers WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },
};

module.exports = Volunteer;
