const { getClientById, update, getStatus } = require('../dal/db/sql/sql-operations');

async function getClientByClientCode(clientCode) {
    const result = await getClientById(clientCode);
    if (result.rowsAffected == 1)
        return result;
    return null

}
async function updateClient(obj) {
    const res = await update(obj);
    return res;
}

async function getStatusNumber() {
    const result = await getStatus();
    return result;
}

module.exports = { updateClient, getClientByClientCode, getStatusNumber }