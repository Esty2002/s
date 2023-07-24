require('dotenv').config();
const { find } = require('../services/axios');
const { getData, sqlServer } = require('../services/axios');
async function findAuto(table, column, word, condition) {
    try {
        const result = await getData(`/read/auto_complete/${table}/${column}/${word}/${condition}`);
        return result;
    }
    catch (error) {
        throw error;
    }
}

module.exports = { findAuto };