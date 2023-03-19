const { getAll, getClientByField, getClientById } = require('../dal/db/sql/sql-operations')

async function getAllClient() {
    const result = await getAll()
    let resultUser = result.recordset
    resultUser = resultUser.filter(user => user.disabled != true)
    return resultUser
}
async function getClientsById(id) {
    resultUser=await getClientById(id)
    return resultUser.recordset
}

async function getClientsByField(field, value) {
    const result = await getClientByField(field, value)
    return result
}

module.exports = { getAllClient, getClientsByField, getClientsById }
