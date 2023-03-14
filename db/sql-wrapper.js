require('dotenv').config();
const { SQL_SERVER,SQL_PORT,SQL_DB_SUPPLIERS, SQL_DB_BRANCHES, SQL_SERVER_DATABASE, SQL_PASSWORD, SQL_USERNAME } = process.env;
const { connect, disconnect, getConnection } = require('./sql-connection')

let myconfig = {
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
    await connect(myconfig);
    _ = await getConnection().request().query(`IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${SQL_SERVER_DATABASE}') CREATE DATABASE [${SQL_SERVER_DATABASE}];`)
    await disconnect();

    await connect();
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = '${SQL_DB_BRANCHES}') CREATE TABLE [dbo].[${SQL_DB_BRANCHES}](
        Id int Identity (1000,1) NOT NULL,
        SupplierCode nvarchar(50)NOT NULL,
        BranchName nvarchar(20)NOT NULL,
        Status int NOT NULL,
        Street nvarchar(20)NOT NULL,
        HomeNumber int NOT NULL,
        City nvarchar(20)NOT NULL,
        ZipCode nvarchar(20) NULL,
        Phone1 nvarchar(20) NOT NULL,
        Phone2 nvarchar(20) NULL,
        Mobile nvarchar(20) NULL,
        Fax nvarchar(20) NULL,
        Mail nvarchar(20) NULL,
        Notes nvarchar(MAX) NULL,
        CreationDate nvarchar(20) NULL,
        UserThatInsert nvarchar(20)NOT NULL,
        Disabled BIT  NULL,
        DisabledDate nvarchar(20) NULL,
        DisableUser nvarchar(20) NULL
            )`)

    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = '${SQL_DB_SUPPLIERS}') CREATE TABLE [dbo].[${SQL_DB_SUPPLIERS}](
        Id int Identity (1000,1) NOT NULL,
        SupplierCode nvarchar(50) NOT NULL,
        SupplierName nvarchar(50)NOT NULL,
        licensedDealerNumber nvarchar(20)NOT NULL,
        BokkeepingNumber nvarchar(20) NULL,
        ObjectiveBank nvarchar(20) NULL,
        ConditionGushyPayment nvarchar(20) NULL,
        PreferredPaymentDate int  NULL,
        Ovligo int  NULL,
        Status int NOT NULL,
        Street nvarchar(20)NOT NULL,
        HomeNumber int NOT NULL,
        City nvarchar(20)NOT NULL,
        ZipCode nvarchar(20) NULL,
        Phone1 nvarchar(20)NOT NULL,
        Phone2 nvarchar(20) NULL,
        Mobile nvarchar(20) NULL,
        Fax nvarchar(20) NULL,
        Mail nvarchar(20) NULL,
        Notes nvarchar(MAX) NULL,
        CreationDate nvarchar(20) NULL,
        Disabled BIT  NULL,
        DisabledDate nvarchar(20) NULL,
        DisableUser nvarchar(20) NULL
        )`);

    await disconnect();
}

module.exports = { connectToSql };
