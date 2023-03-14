const { getAll, getClientByField, getClientById } = require('../dal/db/sql/sql-operations')

async function getAllClient() {
    const result = await getAll()
    let resultUser = result.recordset
    resultUser = resultUser.filter(user => user.disabled != true)
    return resultUser
}
async function getClientsById(id) {
    const result = await getAll()
    let resultUser = result.recordset
    let isExsist = false
    for (let item of resultUser) {
        if (item.clientCode == id && item.disabled!=true)
            isExsist = true
    }
    if (resultUser.disabled == true || !isExsist)
        return false
    resultUser=await getClientById(id)
   
    return resultUser.recordset
}

async function getClientsByField(field, value) {
    const result = await getClientByField(field, value)
    return result
}

module.exports = { getAllClient, getClientsByField, getClientsById }
