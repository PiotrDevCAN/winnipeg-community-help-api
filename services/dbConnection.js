// const db = require('./postgres/dbConnectionPostgres');
// const db = require('./postgres/dbConnectionSupabase');
// const db = require('./postgres/dbConnectionClient');
const db = require('./postgres/dbConnectionPool');

module.exports = db;