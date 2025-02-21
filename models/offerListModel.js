const db = require('../services/dbConnection');
const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'help_offer_links';
const TABLE_COLUMNS = [
    'id',
    'help_request_id',
    'volunteer_id',
    'created_at',
    'updated_at'
];

class OfferList extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }

    async getUserOffers(id) {
        try {
            const results = await db.query(`
                SELECT COUNT(*) AS amount 
                FROM ${this.tableName} 
                WHERE in_need_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch records amount by ID from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = new OfferList();
