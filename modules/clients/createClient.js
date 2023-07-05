const { postData } = require('../../services/axios')

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

    let unique = await postData('/read/readTopN', object)
    if (unique.data.length === 0) {
<<<<<<< HEAD
        const result = await postData('/create/create',newObj)
=======
        console.log(newObj, ' newObj in createClient');
        const result = await postData('/create/create',newObj)
        
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
        return result;
    }
}

module.exports = { addOneClient }