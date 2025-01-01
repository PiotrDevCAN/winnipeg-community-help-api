const db = require('../services/dbConnection');
const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'help_types';
const TABLE_COLUMNS = [
    'label',
    'description',
    'category_id'
];

class HelpType extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }

    async getAllRecords() {
        try {
            const results = await db.query('SELECT HT.*, HC.label as category_label FROM help_types AS HT LEFT JOIN help_categories AS HC ON HT.category_id = HC.id');
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    }
}

module.exports = new HelpType();
