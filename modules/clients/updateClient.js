const {postData}=require ('../ajax')

async function updateClient(obj) {
    let object={
        "tableName":"CLIENTS",
        "condition":`clientCode=${obj.clientCode}`,
        "values":obj
    }
    _= await postData('http://127.0.0.1:1313/update/update', JSON.stringify(object));
   
}
module.exports = { updateClient }
