const db = require('../services/dbConnection');
const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'requests';
const TABLE_COLUMNS = [
    'type_id',
    'community_id',
    'title',
    'description',
    'status'
];

class Request extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }

    async getAllRecords() {
        try {
            const results = await db.query(
                `SELECT R.*, 
                 U.first_name, U.last_name,
                 HT.label AS type_name, 
                 HC.id AS category_id, HC.label AS category_name, 
                 C.label AS sub_community_name, 
                 MC.id AS main_community_id, MC.label AS community_name
                 FROM requests AS R 
                 LEFT JOIN users AS U ON U.ID = R.requestor_id
                 LEFT JOIN help_types AS HT ON R.type_id = HT.id 
                 LEFT JOIN help_categories AS HC ON HT.category_id = HC.id 
                 LEFT JOIN communities AS C ON R.community_id = C.id 
                 LEFT JOIN main_communities AS MC ON C.community_id = MC.id`
            );
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error('Database query failed: ' + error.message);
        }
    }

    async getUserRequests(id) {
        try {
            const results = await db.query(`SELECT COUNT(*) AS amount FROM ${this.tableName} WHERE requestor_id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch records amount by ID from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = new Request();
