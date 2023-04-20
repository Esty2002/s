const { getClientById, deleteClient } = require('../../services-clients/sql/sql-operations');

async function deletedClientByCode(clientCode, userName) {
    const exist = await getClientById(clientCode);
    let result;
    if (exist.rowsAffected != 0) {
        result = await deleteClient(clientCode, userName);
        return result;
    }
    return false
}



module.exports = { deletedClientByCode }   