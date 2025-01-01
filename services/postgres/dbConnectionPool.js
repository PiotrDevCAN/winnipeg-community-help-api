require('dotenv').config();
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

// const pool = new Pool({
//     user: process.env.SUPABASE_DB_USER,
//     host: process.env.SUPABASE_DB_HOST,
//     database: process.env.SUPABASE_DB_NAME,
//     password: process.env.SUPABASE_DB_PASSWORD,
//     port: process.env.SUPABASE_DB_PORT,
// });

pool.on('error', (err) => {
  console.error('something bad has happened!', err.stack)
})

pool.connect()
  .then(() => console.log('Connected to Supabase database via pool'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = pool;