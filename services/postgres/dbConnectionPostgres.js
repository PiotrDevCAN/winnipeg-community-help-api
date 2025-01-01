const postgres = require('postgres');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL
const connection = postgres(connectionString);

(async () => {
    try {
        // Test the connection by running a simple query
        const result = await connection`SELECT NOW() AS current_time`;
        console.log('Connected to the database successfully.');
        console.log('Current database time:', result[0].current_time);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    } finally {
        // Optionally, close the connection
        connection.end();
    }
})();

module.exports = connection;