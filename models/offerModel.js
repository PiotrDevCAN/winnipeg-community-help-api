const db = require('../services/dbConnection');
const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'offers';
const TABLE_COLUMNS = [
    'type_id',
    'community_id',
    'title',
    'description',
    'status'
];

class Offer extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }

    async getAllRecords() {
        try {
            const results = await db.query('SELECT O.*, HT.label AS type_name, HC.id AS category_id, HC.label AS category_name, C.label AS sub_community_name, MC.id AS main_community_id, MC.label FROM offers AS O LEFT JOIN help_types AS HT ON O.type_id = HT.id LEFT JOIN help_categories AS HC ON HT.category_id = HC.id LEFT JOIN communities AS C ON O.community_id = C.id LEFT JOIN main_communities AS MC ON C.community_id = MC.id');
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    }
}

module.exports = new Offer();
