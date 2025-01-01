const db = require('./dbConnection');

class DBHandler {
    constructor(tableName, tableColumns) {
        this.tableName = tableName;
        this.tableColumns = tableColumns;
    }

    async getAllRecords() {
        try {
            const results = await db.query(`SELECT * FROM ${this.tableName}`);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to fetch records from ${this.tableName}: ${error.message}`);
        }
    }

    async getRecordById(id) {
        try {
            const results = await db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
            const { rows } = results;
             return rows;
        } catch (error) {
            throw new Error(`Failed to fetch record by ID from ${this.tableName}: ${error.message}`);
        }
    }

    async createRecord(data) {
        try {
            const columns = this.tableColumns.join(', ');
            const placeholders = this.tableColumns.map(() => '?').join(', ');

            const results = await db.query(
                `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`,
                this.tableColumns.map((col) => data[col])
            );

            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to create record in ${this.tableName}: ${error.message}`);
        }
    }

    async updateRecord(id, data) {
        try {
            if (!id) throw new Error('Invalid ID');

            const updates = this.tableColumns.map((col) => `${col} = $1`).join(', ');

            const results = await db.query(
                `UPDATE ${this.tableName} SET ${updates} WHERE id = $1`,
                [...this.tableColumns.map((col) => data[col]), id]
            );

            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to update record in ${this.tableName}: ${error.message}`);
        }
    }

    async deleteRecord(id) {
        try {
            const results = await db.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
            const { rows } = results;
            return rows;
        } catch (error) {
            throw new Error(`Failed to delete record from ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = DBHandler;
