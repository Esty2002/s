require('dotenv').config();
const { getData } = require('../services/axios');

async function findAuto(table, column, word) {

    return await getData(sqlServer, `/read/auto_complete/${table}/${column}/${word}`);
}

module.exports = { findAuto }