const { getConnection, connect, disconnect } = require('./sql-connection')

// async function createTable() {
//     await connect()
//     _ = await getConnection().request().query(`CREATE TABLE CLIENTS(
//         serialNumber int Identity (200,1) NOT NULL,
//         clientCode nvarchar(50) NOT NULL,
//         clientName nvarchar(50)NOT NULL,
//         privaetCompanyNumber nvarchar(50) NOT NULL,
//         bookkeepingNumber nvarchar(50),
//         destinationBank nvarchar(50) ,
//         paymentTermsFluent nvarchar(10) ,
//         preferredPaymentDate int ,
//         ovligo int ,
//         receiptIssueTerm nvarchar(20) ,
//         receiptCentralism nvarchar(20) ,
//         accountantClassifiedCode int ,
//         status int NOT NULL,
//         description nvarchar(20) NOT NULL,
//         street nvarchar(20) NOT NULL,
//         house nvarchar(20) NOT NULL,
//         city nvarchar(20) NOT NULL,
//         zipCode nvarchar(20) NOT NULL,
//         telephone1 nvarchar(20) NOT NULL,
//         telephone2 nvarchar(20) NOT NULL,
//         mobilePhone nvarchar(20) NOT NULL,
//         fax nvarchar(20) NOT NULL,
//         email nvarchar(20) NOT NULL,
//         comments nvarchar(20) NOT NULL,
//         creationDate nvarchar(20) NOT NULL,
//         userThatAdd nvarchar(20) NOT NULL,
//         disabled nvarchar(20) NOT NULL,
//         deletionDate nvarchar(20) NOT NULL,
//         userThatDelete nvarchar(20) NOT NULL
//         )`)
// }

async function addClient(obj) {
    await connect();
    const result = await getConnection().request().query(`insert into CLIENTS values( 
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
async function getStatus(status) {
    await connect()
    const result = await getConnection().request().query(`
    select serialNumber from status where  status='${status}'`)
    disconnect()
    return result.recordset[0].serialNumber;
}

async function getCodeClient(){
    await connect()
    const result=await getConnection().request().query(`SELECT CLIENTCODE FROM CLIENTS`)
    disconnect()
    return result
}
module.exports = { addClient ,getStatus,getCodeClient}