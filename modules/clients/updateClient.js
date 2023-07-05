<<<<<<< HEAD
const { postData} = require('../../services/axios')
=======
const { postData , } = require('../../services/axios')
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741

async function updateClient(obj) {
    let object={
        "tableName":"tbl_Clients",
        "condition":`ClientCode=${obj.ClientCode}`,
        "values":obj
    }
<<<<<<< HEAD
    const response = await postData('/update/update', object)
    return response;
=======
    _= await postData( '/update/update', object)
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
   
}
module.exports = { updateClient } 
