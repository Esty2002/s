require('dotenv').config()
const { SQL_SERVER, SQL_PORT, SQL_DB_CLIENTS, SQL_SERVER_DATABASE, SQL_PASSWORD, SQL_USERNAME } = process.env;
const { connect, disconnect, getConnection } = require('./sql-connection')

let myConfig = {
    server: SQL_SERVER,
    options: {
        port: SQL_PORT,
        trustServerCertificate: true
    },
    authentication: {
        type: "default",
        options: {
            userName: SQL_USERNAME,
            password: SQL_PASSWORD
        }
    }
}

async function connectToSql() {
    await connect(myConfig)
    _ = await getConnection().request().query(`IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${SQL_SERVER_DATABASE}') CREATE DATABASE [${SQL_SERVER_DATABASE}];`)
    disconnect()

    await connect()
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = '${SQL_DB_CLIENTS}') CREATE TABLE [dbo].[${SQL_DB_CLIENTS}]
    (serialNumber int Identity (100,1) NOT NULL,
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
    userThatDelete nvarchar(20))`)
    disconnect()
}

module.exports={connectToSql}