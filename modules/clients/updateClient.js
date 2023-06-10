const { postData ,sqlServer} = require('../../services/axios')

async function updateClient(obj) {
    let object={
        "tableName":"tbl_Clients",
        "condition":`ClientCode=${obj.ClientCode}`,
        "values":obj
    }
    _= await postData(sqlServer,'/update/update', object)
   
}
module.exports = { updateClient } 
