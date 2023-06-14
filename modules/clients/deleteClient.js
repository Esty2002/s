const { postData ,sqlServer} = require('../../services/axios')

async function deletedClientByCode(clientCode, userName) {

    let obj = {
        'tableName': 'tbl_Clients',
        'columns': '*',
        'condition': `ClientCode=${clientCode}`
    }

    const exist = await postData(sqlServer,`/read/readTopN`,obj)
    let result;

    if (exist.rowsAffected != 0) {

        obj['condition'] = `clientCode=${clientCode}`
        obj['values'] = {'Disabled':true,'deletionDate':new Date(),'userThatDelete':'Gpree'}

        result = await postData(sqlServer,'/update/update', obj)
        return result.data;
    }
    
    return false
}



module.exports = { deletedClientByCode }   