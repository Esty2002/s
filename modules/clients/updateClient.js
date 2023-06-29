const { postData} = require('../../services/axios')

async function updateClient(obj) {
    let object={
        "tableName":"tbl_Clients",
        "condition":`ClientCode=${obj.ClientCode}`,
        "values":obj
    }
    const response = await postData('/update/update', object)
    return response;
   
}
module.exports = { updateClient } 
