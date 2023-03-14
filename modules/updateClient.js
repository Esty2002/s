const { getClient, update } = require('../dal/db/sql/sql-operations');

async function getClientByClientCode(clientCode) {
    console.log('in module');
    const result = await getClient(clientCode);
    if (result.rowsAffected == 1) {
        console.log(result, ' in module afterrrrr');
        return result;
    }
    else{
        console.log('this password not exists');
        return null
    }
}
async function updateClient(obj) {
    console.log(' i in module');
        await update(obj);
}

module.exports = { updateClient, getClientByClientCode }