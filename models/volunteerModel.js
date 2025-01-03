const db = require('../services/dbConnection');
const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'volunteers';
const TABLE_COLUMNS = [
    'community_id',
    'first_name',
    'last_name',
    'nick',
    'email',
    'phone_number',
    'website',
    'description',
    'confirmed'
];

class Volunteer extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }

    async getAllRecords() {
        try {
            const results = await db.query('SELECT V.*, C.label AS sub_community_name, MC.id AS main_community_id, MC.label AS community_name FROM volunteers AS V LEFT JOIN communities AS C ON V.community_id = C.id LEFT JOIN main_communities AS MC ON C.community_id = MC.id');
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    }

    async getVolunteersInCommunity(id) {
        try {
            const results = await db.query(`SELECT COUNT(*) AS amount FROM ${this.tableName} WHERE community_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch users amount by COMMUNITY_ID from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = new Volunteer();
