const { postData, sqlServer } = require('../../services/axios')

async function addOneClient(obj) {
    let newObj = {
        'tableName': 'tbl_Clients',
        'values': obj
    }
    let object = {
        'tableName': 'tbl_Clients',
        'columns': '*',
        'condition': `ClientCode=${obj.ClientCode}`
    }
    let unique = await postData(sqlServer,'http://127.0.0.1:1313/read/readTopN', object)
    if (unique.data.length === 0) {
        console.log(newObj, ' newObj in createClient');
        const result = await postData(sqlServer,'http://127.0.0.1:1313/create/create',newObj)
        return result;
    }
}
module.exports = { addOneClient }