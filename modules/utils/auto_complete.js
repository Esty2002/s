require('dotenv').config();
const { find } = require('../../services/axios');
const { getData } = require('../../services/axios');
async function findAuto(table, column, word) {
    const result = await getData( `/read/auto_complete/${table}/${column}/${word}`);
    console.log({result})
    return result.data;
}

module.exports = { findAuto }