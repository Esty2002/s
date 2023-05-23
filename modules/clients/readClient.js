const {postData}=require ('../../services/axios')

async function getAllClient() {
    let obj={}
    obj['tableName']='CLIENTS'
    obj['condition']=`disabled=False`
    obj['columns']='*'
    _= await postData('http://127.0.0.1:1313/read/readTop20', JSON.stringify(obj));
}
async function getClientsById(id) {
    let obj={}
    obj['tableName']='CLIENTS'
    obj['condition']=`clientCode=${id}`
    obj['columns']='*'
    const result= await postData('http://127.0.0.1:1313/read/readTop20', JSON.stringify(obj));
    if (result.rowsAffected == 0)
        return null
    return result.recordset
}

async function getClientsByField(field, value) {
    let obj={}
    obj['tableName']='CLIENTS'
    obj['condition']=`${field}=${value}`
    obj['columns']='*'
    const result= await postData('http://127.0.0.1:1313/read/readTop20', JSON.stringify(obj));
    if (result.rowsAffected == 0)
        return null
    return result
}


module.exports = { getAllClient, getClientsByField, getClientsById }
