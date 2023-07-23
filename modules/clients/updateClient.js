const { postData , } = require('../../services/axios')

async function updateClient(obj) {
    let clone ={...obj}
    delete clone.Id

    let object={
        "entityName":"tbl_Clients",
        "condition":{Id:obj.Id},
        "values":clone
    }
    _= await postData( '/update/update', object)
   
}
module.exports = { updateClient } 
