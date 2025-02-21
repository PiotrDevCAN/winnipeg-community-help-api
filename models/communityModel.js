const db = require('../services/dbConnection');
const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'communities';
const TABLE_COLUMNS = [
    'community_id',
    'label',
    'alias',
    'email',
    'phone_number',
    'website',
    'description',
    'confirmed'
];

class Community extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }

    async getOffersInCommunity(id) {
        try {
            const results = await db.query(`
                SELECT COUNT(*) AS amount 
                FROM OFFERS AS U
                WHERE U.community_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch users amount by COMMUNITY_ID from ${this.tableName}: ${error.message}`);
        }
    }

    async getRequestsInCommunity(id) {
        try {
            const results = await db.query(`
                SELECT COUNT(*) AS amount 
                FROM REQUESTS AS U
                WHERE U.community_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch users amount by COMMUNITY_ID from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = new Community();
