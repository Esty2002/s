const { getAll, insert } = require('../db/sql-operation');

async function getallbranches() {
    const result = await getAll('Branches')
    return result;
}

async function insertbranch(table,columns, values) {
    const result = await insert(table,columns, values)
    return result;
}

module.exports = { getallbranches ,insertbranch}