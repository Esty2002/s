const { postData} = require('../../services/axios')
async function deletedClientByCode(clientCode, userName) {

    let obj = {
        'entityName': 'tbl_Clients',
        'columns': '*',
        'condition': `ClientCode=${clientCode}`
    }

    const exist = await postData(`/read/readTopN`,obj)
    let result;
    if (exist) {

        obj['condition'] = {clientCode}
        obj['values'] = {'Disabled':true,'deletionDate':new Date(),'userThatDelete':'Gpree'}

        result = await postData('/update/update', obj)
        return result.data;
    }
    
    return false
}

module.exports = { deletedClientByCode }   