const { postData, getData} = require('../../services/axios')

async function getAllClient() {
    
    let query = {disabled:0}
    const result= await getData('/read/readMany/Clients',query);
    return result
}

async function getAllDeletedClient() {
    let query = {disabled:1}
    const result= await getData('/read/readMany/Clients',query);
    return result
}

async function getClientsById(id) {
    let obj={}
    obj['entityName']='tbl_Clients'
    obj['condition']=`id=${id}`
    obj['columns']='*'
    const result= await postData('/read/readTopN', obj);
   console.log(result,' result');
    if (result==undefined) 
        return null
    return result
}


async function getClientsByField(field, value) {
    let obj={}
    obj['entityName']='tbl_Clients'
    obj['condition']=`${field}=${value}`
    obj['columns']='*'
    const result= await postData('/read/readTopN', obj);
    console.log(result,' result');
    if (result==undefined)
        return null
    return result
}

module.exports = { getAllClient, getClientsByField, getClientsById, getAllDeletedClient }
