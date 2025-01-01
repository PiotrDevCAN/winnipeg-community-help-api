const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'help_categories';
const TABLE_COLUMNS = [
    'label',
    'description'
];

const HelpCategory = new DBHandler(TABLE_NAME, TABLE_COLUMNS);

module.exports = HelpCategory;
