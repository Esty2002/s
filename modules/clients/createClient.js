const { postData } = require('../../services/axios')

async function addOneClient(obj) {

   
    const values = {...obj}
    delete values.Id

    let newObj = {
        'entityName': 'Clients',
        'values': values
    }
    let object = {
        'entityName': 'Clients',
        'columns': '*',
        'condition': `ClientCode=${obj.ClientCode}`
    }

    let unique = await postData('/read/readTopN', object)
    if (unique.data.length === 0) {
        const result = await postData('/create/createone',newObj)
        return result;
    }
    else{
        return false
    }
}

module.exports = { addOneClient }