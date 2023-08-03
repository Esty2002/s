require('dotenv').config();
const { getData,queryTypes  } = require('../../services/axios');
async function findAuto(table, column, word, condition) {
    const query = {}
    condition[queryTypes.INCLUDES]={}
    condition[queryTypes.INCLUDES][column]=word

    console.log({condition})
    query[queryTypes.AND] = [condition]
    
    const result = await getData(`/read/auto_complete/${table}/${column}`, condition);

    return result

}

module.exports = { findAuto }