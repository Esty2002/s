const { getConnection, connect, disconnect } = require('./sql-connection')

async function getClient(clientCode) {
    console.log('in getClient');
    await connect();
    const result = await getConnection().request()
        .query(`select * from CLIENTS where clientCode='${clientCode}'`)
    disconnect();
    console.log(result.rowsAffected + ' rowsAffected');
    return result;
}

// async function deleteOne(clientCode) {
//     await connect();
//     const result = await getConnection().request()
//         .query(`delete from CLIENTS where clientCode=${clientCode}`)
//     console.log(result);
//     disconnect()
//     return result;
// }

async function update(obj) {
    console.log(obj,' obj');
    await connect();
    const result = await getConnection().request().query(`UPDATE clients  
    SET [clientName]='${obj.clientName}',
    [privaetCompanyNumber]='${obj.privaetCompanyNumber}',
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
    console.log(result);
    // return result;

}
module.exports = { getClient, update }