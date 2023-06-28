require('dotenv').config();
const { getData } = require('../../services/axios');
async function findAuto(table, column, word, condition) {
    const result = await getData(`/read/auto_complete/${table}/${column}/${word}/${condition}`);

    return result;


}

module.exports = { findAuto }