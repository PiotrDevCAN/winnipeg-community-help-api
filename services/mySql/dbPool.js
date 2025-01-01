const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    // socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const ensureConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection established successfully');
        connection.release();
    } catch (error) {
        console.error('Failed to establish database connection:', error.message);
        throw new Error('Database connection failed');
    }
};

ensureConnection();

module.exports = pool;
