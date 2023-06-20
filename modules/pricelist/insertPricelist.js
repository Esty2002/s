
const { sqlServer, postData, getData } = require('../../services/axios')



async function insert(data, tableName) {
    let obj = {}
    console.log(data, ' data');
    console.log(tableName, ' tbname');
   
    obj['tableName'] = tableName
    obj['values'] = data
    obj['columns'] = '*'

    _= await postData(sqlServer, '/create/create', obj)
    return true;
}

async function getProducts(tbName){
    let obj={}
    obj['tableName']=tbName
    obj['columns']='*'

    const response=await postData(sqlServer,'/read/readTopN',obj)
    console.log(response.data,' res');

    return response.data;
}


module.exports = { insert,getProducts}