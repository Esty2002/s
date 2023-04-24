const { addClient, getCodeClient } = require('../../services-clients/sql/sql-operations')

async function addOneClient(obj) {
    let unique = await getCodeClient(obj.clientCode)
    if (unique.rowsAffected > 0)
        return false;
    const result = await addClient(obj)
    return result
}
module.exports = { addOneClient }