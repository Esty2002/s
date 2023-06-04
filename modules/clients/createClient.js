const { postData, sqlServer } = require('../../services/axios')

async function addOneClient(obj) {
    let newObj = {
        'tableName': 'tbl_Clients',
        'values': obj
    }
    let object = {
        'tableName': 'tbl_Clients',
        'columns': '*',
        'condition': `clientCode=${obj.clientCode}`
    }
    let unique = await postData(sqlServer,'http://127.0.0.1:1313/read/readTopN', JSON.stringify(object))
    console.log(unique, "unique");
    if (unique.rowsAffected[1] === 0) {
        // object['values'] = obj

      
        console.log(newObj, ' newObj in createClient');
        const result = await postData(sqlServer,'http://127.0.0.1:1313/create/create', JSON.stringify(newObj))
        return result;
    }
}
module.exports = { addOneClient }