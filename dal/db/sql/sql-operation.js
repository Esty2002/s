const { connect, getConnection, disconnect } = require('./sql-connection')

async function getClient(clientCode) {
    await connect();
    const result = await getConnection().request()
        .query(`select * 
        from CLIENTS 
        where clientCode = '${clientCode}'`);
    // console.log(result , 'getClient in sql');
    disconnect();
    return result;
}

async function deleteClient(clientCode, userName) {
    await connect();
    const date = new Date().getFullYear();
    const result = await getConnection().request()
        .query(`update CLIENTS
        set disabled = 'true',
        userThatDelete = '${userName}',
        deletionDate = '${date}'
        where clientCode = '${clientCode}'`);
    // console.log(result, 'deleteClient in sql');
    disconnect();
    return result;
}

module.exports = { getClient, deleteClient }