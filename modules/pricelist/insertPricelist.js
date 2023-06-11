
const { sqlServer, postData } = require('../../services/axios')
let obj = {}
async function addOnePriceList(object) {
    let obj = {}
    obj['tableName'] = 'tbl_PriceList2'
    obj['values'] = object
    obj['columns'] = '*'

    _ = await postData(sqlServer, `/create/create`, obj)
    return true;
}

async function insert(data, tableName) {
    console.log(data, ' data');
    console.log(tableName, ' tbname');
   
    obj['tableName'] = tableName
    obj['values'] = data
    obj['columns'] = '*'

    const result = await postData(sqlServer, '/create/create', obj)
    console.log(result, ' result');
    return true;
}


module.exports = { addOnePriceList, insert}