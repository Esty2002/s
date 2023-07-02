const { postData} = require('../../services/axios')
async function deletedClientByCode(clientCode, userName) {

    let obj = {
        'tableName': 'tbl_Clients',
        'columns': '*',
        'condition': `ClientCode=${clientCode}`
    }
    const exist = await postData('http://127.0.0.1:1313/read/readTopN',obj)
    let result;
    if (exist) {

        obj['condition'] = `clientCode=${clientCode}`
        obj['values'] = {'Disabled':true,'deletionDate':new Date(),'userThatDelete':'Gpree'}

        result = await postData('http://127.0.0.1:1313/update/update', obj)

        return result;
    }
    
    return false
}

module.exports = { deletedClientByCode }   