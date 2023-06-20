require('dotenv').config();
const { find } = require('../services/axios');
const { getData, sqlServer } = require('../services/axios');
async function findAuto(table, column, word) {
    console.log("i did it");
    const result = await getData(sqlServer, `/read/auto_complete/${table}/${column}/${word}`);
    return result.data;
}

module.exports = { findAuto }