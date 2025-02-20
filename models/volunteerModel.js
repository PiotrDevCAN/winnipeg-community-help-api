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
            const results = await db.query(
                `SELECT V.*, 
                U.firebase_id,
                U.first_name,
                U.last_name,
                U.nickname,
                U.phone_number,
                U.website,
                U.description,
                U.gender,
                U.birth_date,
                U.prefix,
                U.email,
                C.label AS sub_community_name, 
                MC.id AS main_community_id, MC.label AS community_name 
                FROM ${this.tableName} AS V 
                LEFT JOIN users AS U ON V.user_id = U.id 
                LEFT JOIN communities AS C ON U.community_id = C.id 
                LEFT JOIN main_communities AS MC ON C.community_id = MC.id`
            );
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    }

    async getRecordById(id) {
        try {
            const results = await db.query(
                `SELECT V.*, 
                U.firebase_id,
                U.first_name,
                U.last_name,
                U.nickname,
                U.phone_number,
                U.website,
                U.description,
                U.gender,
                U.birth_date,
                U.prefix,
                U.email,
                U.community_id
                FROM ${this.tableName} AS V 
                LEFT JOIN users AS U ON V.user_id = U.id
                WHERE V.id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch record by ID from ${this.tableName}: ${error.message}`);
        }
    }

    async getVolunteersInCommunity(id) {
        try {
            const results = await db.query(`
                SELECT COUNT(*) AS amount
                FROM ${this.tableName} AS V 
                LEFT JOIN users AS U ON V.user_id = U.id
                WHERE U.community_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch users amount by COMMUNITY_ID from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = new Volunteer();
