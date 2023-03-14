const { getClientById, deleteClient } = require('../dal/db/sql/sql-operations');

async function deletedClientByCode(clientCode, userName) {
    const exist = await getClientById(clientCode);
    let result;
    // console.log(exist, "       exist");
    if (exist.rowsAffected != 0 && exist.recordset.disabled != 'true') {
        result = await deleteClient(clientCode, userName);
    }
    else {
        console.log('client code not exist');
    }
    // console.log(result , '   in module');
    return result;
}

module.exports = { deletedClientByCode }