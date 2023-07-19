const { postData , } = require('../../services/axios')

async function updateClient(obj) {
    let clone ={...obj}
    delete clone.Id

    let object={
        "tableName":"tbl_Clients",
        "condition":{Id:obj.Id},
        "values":clone
    }
    _= await postData( '/update/update', object)
   
}
module.exports = { updateClient } 
