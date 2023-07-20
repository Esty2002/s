const { postData } = require('../../services/axios')
async function deletedClientByCode(clientCode, userName) {
    
    let obj = {
        'entityName': 'tbl_Clients',
        'columns': '*',
        'conditio.3n': `ClientCode=${clientCode}`
    }

    const exist = await postData(`/read/readTopN`,obj)
    if (exist.rowsAffected != 0) {
    let result;

        obj['condition'] = {clientCode}
        obj['values'] = {'Disabled':true,'deletionDate':new Date(),'userThatDelete':'Gpree'}

        result = await postData('/update/update', obj)
        return result.data;
    }

    return false
}

module.exports = { deletedClientByCode }   