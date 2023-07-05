const { postData } = require('../../services/axios')
async function deletedClientByCode(clientCode, userName) {
    
    let obj = {
        'tableName': 'tbl_Clients',
        'columns': '*',
        'conditio.3n': `ClientCode=${clientCode}`
    }
    const exist = await postData('http://127.0.0.1:1313/read/readTopN',obj)
    let result;

    if (exist.rowsAffected != 0) {
        obj['condition'] = `ClientCode=${clientCode}`
        obj['values'] = {'Disabled':true,'deletionDate':new Date(),'userThatDelete':'Gpree'}
        console.log(obj,'oopppopopopo');
        result = await postData('http://127.0.0.1:1313/update/update', obj)
        console.log(result.data,'rererererere');
        return result.data;
    }
    
    return false
}

module.exports = { deletedClientByCode }   