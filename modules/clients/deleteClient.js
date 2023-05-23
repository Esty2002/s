const { postData } = require("../../services/axios")
async function deletedClientByCode(clientCode, userName) {

    let obj = {
        'tableName': 'CLIENTS',
        'columns': '*',
        'condition': `clientCode=${clientCode}`

    }

    const exist = await postData('http://127.0.0.1:1313/read/readTop20', JSON.stringify(obj))
    let result;

    if (exist.rowsAffected != 0) {

        obj['condition'] = `clientCode=${clientCode}`
        obj['values'] = {'Disabled':true,'deletionDate':new Date(),'userThatDelete':'Gpree'}

        result = await postData('http://127.0.0.1:1313/update/delete', JSON.stringify(obj))
        return result;
    }
    
    return false
}



module.exports = { deletedClientByCode }   