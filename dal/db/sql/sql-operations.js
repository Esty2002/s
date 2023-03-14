const {getConnection,connect,disconnect}=require('./sql-connection')




async function getAll(){
    await connect()
    const result=await getConnection().request().query(`SELECT * FROM CLIENTS`)
    disconnect()
    return result
}

async function getClientById(id){
    await connect()
    const result=await getConnection().request().query(`SELECT * FROM CLIENTS WHERE CLIENTCODE=${id}`)
    disconnect()
    return result
}

async function getClientByField(field ,value){
    await connect()
    const result=await getConnection().request().query(`SELECT * FROM CLIENTS WHERE ${field}='${value}'`)
    disconnect()
    return result
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
 
    
    async function deleteClient(clientCode, userName) {
        await connect();
        const result = await getConnection().request()
        .query(`update CLIENTS
        set disabled = 'true',
        userThatDelete = '${userName}',
        deletionDate = GETDATE()
        where clientCode = '${clientCode}'`);
        // console.log(result, 'deleteClient in sql');
        disconnect();
        return result;
    }
    

module.exports={  update, deleteClient ,getAll,getClientByField,getClientById}