const {getConnection,connect,disconnect}=require('./sql-connection')


async function createTable(){
    await connect()
    _=await getConnection().request().query(`CREATE TABLE CLIENTS(
        serialNumber int Identity (200,1) NOT NULL,
        clientCode nvarchar(50) NOT NULL,
        clientName nvarchar(50)NOT NULL,
        privaetCompanyNumber nvarchar(50) NOT NULL,
        bookkeepingNumber nvarchar(50),
        destinationBank nvarchar(50) ,
        paymentTermsFluent nvarchar(10) ,
        preferredPaymentDate int ,
        ovligo int ,
        receiptIssueTerm nvarchar(20) ,
        receiptCentralism nvarchar(20) ,
        accountantClassifiedCode int ,
        status int NOT NULL,
        description nvarchar(20) ,
        street nvarchar(20) NOT NULL,
        house int NOT NULL,
        city nvarchar(20) NOT NULL,
        zipCode nvarchar(20) ,
        telephone1 nvarchar(20) NOT NULL,
        telephone2 nvarchar(20) ,
        mobilePhone nvarchar(20) ,
        fax nvarchar(20) ,
        email nvarchar(20) ,
        comments nvarchar(20) ,
        creationDate nvarchar(20) NOT NULL,
        userThatAdd nvarchar(20) NOT NULL,
        disabled bit NOT NULL,
        deletionDate nvarchar(50) ,
        userThatDelete nvarchar(20) 
        )`)
}

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


module.exports={getAll,getClientByField,getClientById,createTable}

