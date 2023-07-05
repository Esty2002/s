<<<<<<< HEAD
const { postData} = require('../../services/axios')
=======
const { postData } = require('../../services/axios')
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741

async function getAllClient() {
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`disabled='False'`
    obj['columns']='*'
    const result= await postData('/read/readTopN',obj);
    return result
}

async function getAllDeletedClient() {
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`disabled='True'`
    obj['columns']='*'
    const result= await postData('/read/readTopN',obj);
    return result
}

async function getClientsById(id) {
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`clientCode=${id}`
    obj['columns']='*'
    const result= await postData('/read/readTopN', obj);
<<<<<<< HEAD
//    console.log(result,' result');
=======
   console.log(result,' result');
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    if (result==undefined) 
        return null
    return result
}


async function getClientsByField(field, value) {
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`${field}=${value}`
    obj['columns']='*'
<<<<<<< HEAD
    const result= await postData(sqlServer,'/read/readTopN', obj);
    // console.log(result,' result');
=======
    const result= await postData('/read/readTopN', obj);
    console.log(result,' result');
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    if (result==undefined)
        return null
    return result
}

module.exports = { getAllClient, getClientsByField, getClientsById, getAllDeletedClient }
