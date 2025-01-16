const db = require('../services/dbConnection');
const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'help_request_links';
const TABLE_COLUMNS = [
    'id',
    'help_offer_id',
    'volunteer_id',
    'created_at',
    'updated_at'
];

class RequestList extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }

    async getUserRequests(id) {
        try {
            const results = await db.query(`SELECT COUNT(*) AS amount FROM ${this.tableName} WHERE volunteer_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch records amount by ID from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = new RequestList();
