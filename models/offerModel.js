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
            const results = await db.query(
                `SELECT O.*,
                
                -- requestor --
                UV.id AS volunteer_id,
                UV.first_name AS volunteer_first_name, 
                UV.last_name AS volunteer_last_name,
                
                -- person in need --
                UN.id AS needy_id,
                UN.first_name AS needy_first_name, 
                UN.last_name AS needy_last_name,

                HT.label AS type_name, 
                HC.id AS category_id, HC.label AS category_name, 
                C.label AS sub_community_name, 
                MC.id AS main_community_id, MC.label AS community_name
                FROM offers AS O 
                
                LEFT JOIN volunteers AS V ON V.ID = O.requestor_id
                LEFT JOIN users AS UV ON UV.id = V.user_id

                LEFT JOIN help_offer_links AS L ON L.help_offer_id = O.id
                LEFT JOIN in_needs AS N ON N.id = L.in_need_id
                LEFT JOIN users AS UN ON UN.id = N.user_id

                LEFT JOIN help_types AS HT ON O.type_id = HT.id 
                LEFT JOIN help_categories AS HC ON HT.category_id = HC.id 
                LEFT JOIN communities AS C ON O.community_id = C.id 
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
                `SELECT T.*,
                T.requestor_id AS volunteer_id,
                L.in_need_id
                FROM ${this.tableName} AS T
                LEFT JOIN help_offer_links AS L ON L.help_offer_id = T.id
                WHERE T.id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch record by ID from ${this.tableName}: ${error.message}`);
        }
    }

    async getUserOffers(id) {
        try {
            const results = await db.query(`
                SELECT COUNT(*) AS amount 
                FROM ${this.tableName} 
                WHERE requestor_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch records amount by ID from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = new Offer();
