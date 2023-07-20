const { postData, getData } = require('../../services/axios')
const { SQL_CLIENTS_TABLE } = process.env


async function deletedClientByCode(clientCode, userName) {
    
    const exist = await getData(`/read/readMany/${SQL_CLIENTS_TABLE}`, { ClientCode: ClientCode })
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