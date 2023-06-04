const { postData ,sqlServer} = require('../../services/axios')

async function updateClient(obj) {
    let object={
        "tableName":"tbl_Clients",
        "condition":`clientCode=${obj.clientCode}`,
        "values":obj
    }
    _= await postData(sqlServer,'http://127.0.0.1:1313/update/update', JSON.stringify(object));
   
}
module.exports = { updateClient }
