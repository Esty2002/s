const { getAll, getClientByField, getClientById } = require('../dal/db/sql/sql-operations')

async function getAllClient() {
    const result = await getAll()
    return result.recordset
}
async function getClientsById(id) {
    const result = await getClientById(id)
    if (result.rowsAffected == 0)
        return null
    return result.recordset
}

async function getClientsByField(field, value) {
    const result = await getClientByField(field, value)
    if (result.rowsAffected == 0)
        return null
    return result
}

module.exports = { getAllClient, getClientsByField, getClientsById }
