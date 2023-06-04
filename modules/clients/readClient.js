const {postData}=require ('../ajax')

async function getAllClient() {
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`disabled='False'`
    obj['columns']='*'
    const result= await postData('http://127.0.0.1:1313/read/readTopN', JSON.stringify(obj));
    console.log(obj,"oooooooooooooooooooooo");
    console.log(result,' result  afterrrr');
    return result
}
async function getClientsById(id) {
    console.log("in module",id);
    let obj={}
    obj['tableName']='tbl_Clients'
    obj['condition']=`clientCode=${id}`
    obj['columns']='*'
    const result= await postData('http://127.0.0.1:1313/read/readTopN', JSON.stringify(obj));
   console.log(result,' result');
    if (result==undefined)
        return null
    return result
}


async function getClientsByField(field, value) {
    let obj={}
    obj['tableName']='CLIENTS'
    obj['condition']=`${field}=${value}`
    obj['columns']='*'
    const result= await postData('http://127.0.0.1:1313/read/readTopN', JSON.stringify(obj));
    console.log(result,' result');
    if (result==undefined)
        return null
    return result
}

module.exports = { getAllClient, getClientsByField, getClientsById }
