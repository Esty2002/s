const { postData ,sqlServer} = require('../../services/axios')

async function updateClient(obj) {
    let object={
        "tableName":"tbl_Clients",
        "condition":`ClientCode=${obj.clientCode}`,
        "values":obj
    }
    _= await postData(sqlServer,'/update/update', JSON.stringify(object));
   
}
module.exports = { updateClient }
