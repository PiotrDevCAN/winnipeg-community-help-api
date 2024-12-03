const db = require('../services/dbPool');

const HelpCategory = {
    getAllRecords: async () => {
        try {
            const [results] = await db.query('SELECT * FROM help_categories');
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    getRecordById: async (id) => {
        try {
            const [results] = await db.query('SELECT * FROM help_categories WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    createRecord: async (title, description, callback) => {
        try {
            const [results] = await db.query(
                'INSERT INTO help_categories (title, description) VALUES (?, ?)',
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
                'UPDATE help_categories SET title = ?, description = ?, completed = ? WHERE id = ?',
                [title, description, completed, id]
            );
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    deleteRecord: async (id) => {
        try {
            const [results] = await db.query('DELETE FROM help_categories WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },
};

module.exports = HelpCategory;
