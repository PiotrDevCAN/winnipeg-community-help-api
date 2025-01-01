const DBHandler = require('../services/dbHandler');

const TABLE_NAME = 'communities';
const TABLE_COLUMNS = [
    'community_id',
    'label',
    'alias',
    'email',
    'phone_number',
    'website',
    'description',
    'confirmed'
];

class Community extends DBHandler {
    constructor() {
        super(TABLE_NAME, TABLE_COLUMNS);
    }
}

module.exports = new Community();
