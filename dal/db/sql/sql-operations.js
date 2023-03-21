const { getConnection, connect, disconnect } = require('./sql-connection')


async function getAll() {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM CLIENTS WHERE DISABLED='False'`)
    disconnect()
    return result
}

async function getClientById(id) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM CLIENTS WHERE CLIENTCODE=${id} AND DISABLED='False'`)
    disconnect()
    return result
}

async function getClientByField(field, value) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM CLIENTS WHERE ${field}='${value}'`)
    disconnect()
    return result
}

async function update(obj) {
    await connect();
    const result = await getConnection().request().query(`UPDATE clients  
    SET [clientName]='${obj.clientName}',
    [privaetCompanyNumber]=${obj.privaetCompanyNumber},
    [bookkeepingNumber]='${obj.bookkeepingNumber}',
    [destinationBank]='${obj.destinationBank}',
    [paymentTermsFluent]='${obj.paymentTermsFluent}',
    [preferredPaymentDate]=${obj.preferredPaymentDate},
    [ovligo]=${obj.ovligo},
    [receiptIssueTerm]='${obj.receiptIssueTerm}',
    [receiptCentralism]='${obj.receiptCentralism}',
    [accountantClassifiedCode]=${obj.accountantClassifiedCode},
    [status]=${obj.status},
    [description]='${obj.description}',
    [street]='${obj.street}',
    [house]=${obj.house},
    [city]='${obj.city}',
    [zipCode]='${obj.zipCode}',
    [telephone1]='${obj.telephone1}',
    [telephone2]='${obj.telephone2}',
    [mobilePhone]='${obj.mobilePhone}',
    [fax]='${obj.fax}',
    [email]='${obj.email}',
    [comments]='${obj.comments}',
    [creationDate]='${obj.creationDate}',
    [userThatAdd]='${obj.userThatAdd}'
    WHERE [clientCode]=${obj.clientCode}`);
    disconnect();
    return result;

}

async function deleteStatus(statusCode) {
    await connect();
    const result = await getConnection().request()
        .query(`delete from STATUS where statusName=${statusCode}`)
    disconnect()
    return result;
}

async function deleteClient(clientCode, userName) {
    await connect();
    const result = await getConnection().request()
        .query(`update CLIENTS
        set disabled = 'true',
        userThatDelete = '${userName}',
        deletionDate = GETDATE()
        where clientCode = '${clientCode}'`);
    disconnect();
    return result;
}

async function addClient(obj) {
    await connect();
    _ = await getConnection().request().query(`insert into CLIENTS values( 
        '${obj.clientCode}',
        '${obj.clientName}',
        '${obj.privaetCompanyNumber}',
        '${obj.bookkeepingNumber}',
        '${obj.destinationBank}',
        '${obj.paymentTermsFluent}',
        '${obj.preferredPaymentDate}',
        '${obj.ovligo}',
        '${obj.receiptIssueTerm}',
        '${obj.receiptCentralism}',
        '${obj.accountantClassifiedCode}',
        '${obj.status}',
        '${obj.description}',
       '${obj.street}',
        '${obj.house}',
        '${obj.city}',
        '${obj.zipCode}',
        '${obj.telephone1}',
        '${obj.telephone2}',
        '${obj.mobilePhone}',
        '${obj.fax}',
        '${obj.email}',
        '${obj.comments}',
       '${obj.creationDate}',
        '${obj.userThatAdd}',
       '${obj.disabled}',
        '${obj.deletionDate}',
        '${obj.userThatDelete}') `)
    disconnect()
}

async function addStatus(statusName) {
    await connect();
    _ = await getConnection().request().query(`insert into STATUS values( '${statusName}')`)
    disconnect()
    
}

async function getStatus() {
    await connect()
    const result = await getConnection().request().query(`select * from status`)
    disconnect()
    return result.recordset;

}

async function getCodeClient(clientCode) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM CLIENTS WHERE CLIENTCODE=${clientCode}`)
    disconnect()
    return result
}



module.exports = { update, deleteClient, getAll, getClientByField, getClientById, addClient, getStatus, getCodeClient, deleteStatus, addStatus }