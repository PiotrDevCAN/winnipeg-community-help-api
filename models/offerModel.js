const db = require('../services/dbPool');

const Offer = {
    getAllRecords: async () => {
        try {
            const [results] = await db.query('SELECT O.*, HT.label AS type_name, HC.id AS category_id, HC.label AS category_name, C.label AS sub_community_name, MC.id AS main_community_id, MC.label FROM offers AS O LEFT JOIN help_types AS HT ON O.type_id = HT.id LEFT JOIN help_categories AS HC ON HT.category_id = HC.id LEFT JOIN communities AS C ON O.community_id = C.id LEFT JOIN main_communities AS MC ON C.community_id = MC.id');
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    getRecordById: async (id) => {
        try {
            const [results] = await db.query('SELECT * FROM offers WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    createRecord: async (title, description, callback) => {
        try {
            const [results] = await db.query(
                'INSERT INTO offers (title, description) VALUES (?, ?)',
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
                'UPDATE offers SET title = ?, description = ?, completed = ? WHERE id = ?',
                [title, description, completed, id]
            );
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },

    deleteRecord: async (id) => {
        try {
            const [results] = await db.query('DELETE FROM offers WHERE id = ?', [id]);
            return results;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    },
};

module.exports = Offer;
