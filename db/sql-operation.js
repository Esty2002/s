const { connect, disconnect, getConnection } = require('./sql-connection')
require('dotenv').config();
const { SQL_DB_SUPPLIERS, SQL_DB_BRANCHES, SQL_SERVER_DATABASE } = process.env;

async function createTables() {
    await connect();
    _ = await getConnection().request().query(`IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${SQL_SERVER_DATABASE}') CREATE DATABASE [${SQL_SERVER_DATABASE}];`)

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
        Notes nvarchar(1000) NULL,
        CreationDate nvarchar(20) NULL,
        UserThatInsert nvarchar(20)NOT NULL,
        Disabled nvarchar(5)  NULL,
        DisabledDate nvarchar(20) NULL,
        DisableUser nvarchar(20) NULL
            )`)

    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = '${SQL_DB_SUPPLIERS}') CREATE TABLE [dbo].[${SQL_DB_SUPPLIERS}](
        Id int Identity (1000,1) NOT NULL,
        SupplierCode int NOT NULL,
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
        Notes nvarchar(1000) NULL,
        CreationDate nvarchar(20) NULL,
        Disabled nvarchar(5)  NULL,
        DisabledDate nvarchar(20) NULL,
        DisableUser nvarchar(20) NULL
        )`);
    await disconnect();
}

async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table}`)
    await disconnect()
    return result;
}

async function insert(table,columns,values){
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${table}(${columns}) VALUES (${values})`)
    await disconnect()
    return result;
}
module.exports = { createTables, getAll ,insert}