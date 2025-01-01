const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'main_communities';
const TABLE_COLUMNS = [
    'label',
    'description'
];

const MainCommunity = new DBHandler(TABLE_NAME, TABLE_COLUMNS);

module.exports = MainCommunity;
