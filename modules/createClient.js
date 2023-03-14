const { addClient, getStatus, getCodeClient } = require('../dal/db/sql/sql-operation')

async function addAllClient(obj) {
    console.log('i in addAllClient');
    const unique = await getCodeClient()
    if (unique.include(obj.codeClient))
        return false
    const statusId = await getStatus(obj.status)
    obj.status = statusId
    const result = await addClient(obj)
    return result
}
module.exports = { addAllClient }