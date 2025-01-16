const db = require('../services/dbConnection');
const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'users';
const TABLE_COLUMNS = [
    'firebase_id',
    'first_name',
    'last_name',
    'nickname',
    'phone_number',
    'website',
    'description',
    'gender',
    'birth_date',
    'prefix'
];

class User extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }

    async getAllRecords() {
        try {
            const results = await db.query(
                `SELECT U.*, 
                 C.label AS sub_community_name, 
                 MC.id AS main_community_id, MC.label AS community_name 
                 FROM ${this.tableName} AS U 
                 LEFT JOIN communities AS C ON U.community_id = C.id 
                 LEFT JOIN main_communities AS MC ON C.community_id = MC.id`
            );
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    }

    async getRecordByFirebaseId(id) {
        try {
            const results = await db.query(`SELECT * FROM ${this.tableName} WHERE firebase_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch record by FIREBASE_ID from ${this.tableName}: ${error.message}`);
        }
    }

    async getUsersInCommunity(id) {
        try {
            const results = await db.query(`SELECT COUNT(*) AS amount FROM ${this.tableName} WHERE community_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch users amount by COMMUNITY_ID from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = new User();
