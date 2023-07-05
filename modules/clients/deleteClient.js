const { postData } = require('../../services/axios')
async function deletedClientByCode(clientCode, userName) {  
    let obj = {
        'tableName': 'tbl_Clients',
        'condition': `ClientCode=${clientCode}`,
        'columns': '*'
    }
    const exist = await postData('/read/readTopN',obj)
    let result;
    if (exist.rowsAffected != 0) {
        // obj['condition'] = `ClientCode=${clientCode}`
        obj['values'] = {'Disabled':true,'DeletionDate':new Date(),'UserThatDelete':'Gpree'}
        result = await postData('/update/update', obj)
        return result.data;
    }
    
    return false
}



module.exports = { deletedClientByCode }   