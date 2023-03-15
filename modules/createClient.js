const { addClient, getStatus, getCodeClient } = require('../dal/db/sql/sql-operation')

async function addAllClient(obj) {
    let unique = await getCodeClient()
    for(let item of unique.recordset){
        if(item.CLIENTCODE==obj.clientCode)
        {
            return false
        }
    }
    const statusId = await getStatus(obj.status)
    obj.status = statusId
    const result = await addClient(obj)
    return result
}
module.exports = { addAllClient }