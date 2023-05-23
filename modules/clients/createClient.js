const { postData } = require('../../services/axios')

async function addOneClient(obj) {
    let newObj = {
        'tableName': 'CLIENTS',
        'values': obj
    }
    let object = {
        'tableName': 'CLIENTS',
        'columns': '*',
        'condition': `clientCode=${obj.clientCode}`
    }
    let unique = await postData('http://127.0.0.1:1313/read/readTop20', JSON.stringify(object))
    console.log(unique, "unique");
    if (unique.rowsAffected[1] === 0) {
        // object['values'] = obj

      
        console.log(newObj, ' newObj in createClient');
        const result = await postData('http://127.0.0.1:1313/create/create', JSON.stringify(newObj))
        return result;
    }
}
module.exports = { addOneClient }