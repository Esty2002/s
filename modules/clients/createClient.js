const { postData } = require('../../services/axios')

async function addOneClient(obj) {
    delete obj.Id

    let newObj = {
        'tableName': 'tbl_Clients',
        'values': obj
    }
    let object = {
        'tableName': 'tbl_Clients',
        'columns': '*',
        'condition': `ClientCode=${obj.ClientCode}`
    }

    let unique = await postData('/read/readTopN', object)
    if (unique.data.length === 0) {
        const result = await postData('/create/create',newObj)
        return result;
    }
    else{
        return false
    }
}

module.exports = { addOneClient }