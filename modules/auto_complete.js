require('dotenv').config();
const { find } = require('../services/axios');
const { getData, sqlServer } = require('../services/axios');
async function findAuto(table, column, word,condition) {
    console.log("i did it");
    const result = await getData(`/read/auto_complete/${table}/${column}/${word}/${condition}`);
    console.log("----------------------------------------------");
    console.log(result.data, "result.data");
    return result.data;
}

module.exports = { findAuto }