require('dotenv').config();
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString,
});

// const client = new Client({
//   host: process.env.SUPABASE_DB_HOST,
//   port: process.env.SUPABASE_DB_PORT,
//   user: process.env.SUPABASE_DB_USER,
//   password: process.env.SUPABASE_DB_PASSWORD,
//   database: process.env.SUPABASE_DB_NAME,
// });

client.connect()
  .then(() => console.log('Connected to Supabase database via client'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = client;
