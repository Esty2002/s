const {update} = require('../services/sql/sql-operations');

async function updateColumns(table, column, value, columnCond, valueCond) {
    let res = await update(table, column, value, columnCond, valueCond);
    return res;
}

module.exports = { updateColumns };
