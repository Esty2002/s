const { postData ,sqlServer} = require('../../services/axios')

async function getAllClient() {
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`disabled='False'`
    obj['columns']='*'
    const result= await postData(sqlServer,'/read/readTopN',obj);
    return result
}
async function getClientsById(id) {
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`clientCode=${id}`
    obj['columns']='*'
    const result= await postData(sqlServer,'/read/readTopN', obj);
   console.log(result,' result');
    if (result==undefined) 
        return null
    return result
}


async function getClientsByField(field, value) {
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`${field}=${value}`
    obj['columns']='*'
    const result= await postData(sqlServer,'/read/readTopN', obj);
    console.log(result,' result');
    if (result==undefined)
        return null
    return result
}

module.exports = { getAllClient, getClientsByField, getClientsById }
