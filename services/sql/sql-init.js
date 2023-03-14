require('dotenv').config()
const { getConnection, connect, disconnect } = require('./sql-connection');
const { SQL_SERVER, SQL_DBNAME, SQL_USERNAME, SQL_PASSWORD ,SQL_PORT} = process.env;

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

async function createTables() {

    await connect(myconfig);
    _ = await getConnection().request().query(`IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${SQL_DBNAME}') CREATE DATABASE [${SQL_DBNAME}];`)
  
    await disconnect();

    await connect();
 

    // --יצירת טבלה בסיסית
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'BasicDetails') CREATE TABLE [dbo].[BasicDetails](
        ReceiptNumber NVARCHAR(20) PRIMARY KEY NOT NULL,
        SerialNumber INT IDENTITY NOT NULL,
        ClientCode INT NOT NULL,
        Date DATE NOT NULL,
        TotalSum FLOAT NOT NULL,
        PaymentId INT NOT NULL,--FOREIGN KEY([PaymentId])
        UserName NVARCHAR(20) NOT NULL,
        Comments NVARCHAR(50) NULL,
        InsertDate DATE NOT NULL,
        Disabled BIT NOT NULL, 
        DeleteDate DATE NULL
    )`)

    // --טבלת נרמול סוגי תשלום
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PaymentTypes') 
    CREATE TABLE [dbo].[PaymentTypes](
        SerialNumber INT IDENTITY NOT NULL,
        PaymentId INT  NOT NULL,
        PaymentType NVARCHAR(20)  NOT NULL
    )

    INSERT INTO PaymentTypes
    VALUES(1, 'מזומן')
     INSERT INTO PaymentTypes
     VALUES(2, 'שק')
     INSERT INTO PaymentTypes
     VALUES(3, 'אשראי')
     INSERT INTO PaymentTypes
     VALUES(4, 'הו"ק')
     INSERT INTO PaymentTypes
     VALUES(5, 'העברה בנקאית')
    `)

    // --טבלת מזומן
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Cash') CREATE TABLE [dbo].[Cash](
        ReceiptNumber NVARCHAR(20) FOREIGN KEY(ReceiptNumber) REFERENCES BasicDetails(ReceiptNumber) NOT NULL,

        SerialNumber INT IDENTITY NOT NULL,
        SumOfCash INT NOT NULL
    )`)

    // --טבלת צק
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Cheque') CREATE TABLE [dbo].[Cheque](
        ReceiptNumber NVARCHAR(20) PRIMARY KEY NOT NULL,
        SerialNumber INT IDENTITY NOT NULL,
        SumOfCheque INT NOT NULL,
        BankNumber NVARCHAR(10) NOT NULL,
        BankBranch NVARCHAR(10) NOT NULL,
        AccountNumber NVARCHAR(20)  NOT NULL,
        Date DATE NOT NULL,
        DocumentUrl NVARCHAR(20)NOT NULL
    )`)

    // --טבלת אשראי
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Credit') CREATE TABLE [dbo].[Credit](
        ReceiptNumber NVARCHAR(20) PRIMARY KEY NOT NULL,
        SerialNumber INT IDENTITY NOT NULL,
        SumOfCredit INT NOT NULL,
        CreditNumber NVARCHAR(16)NOT NULL,
        CardType NVARCHAR(20)NOT NULL,
        OwnerCard NVARCHAR(40)NOT NULL,
        IdOwnerCard NVARCHAR(9)NOT NULL,
        Validity NVARCHAR(4)NOT NULL,
        PaymentMethod NVARCHAR(20)NOT NULL,
        PaymentsSum INT NOT NULL,
        CardName NVARCHAR(20)NOT NULL
    )`)

    // --טבלת הו"ק    
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'StandingOrder') CREATE TABLE [dbo].[StandingOrder](
        ReceiptNumber NVARCHAR(20) PRIMARY KEY NOT NULL,
        SerialNumber INT IDENTITY NOT NULL,
        SumOfStandingOrder INT NOT NULL,
        StandingOrderType NVARCHAR(20)NOT NULL,
        AccountNumberOrCard NVARCHAR(40)NOT NULL,
        UntilDate DATE NOT NULL,
        ProofBackFromBank NVARCHAR(20)NOT NULL
    )`)

    // --טבלת העברה בנקאית      
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'BankTransfer') CREATE TABLE [dbo].[BankTransfer](
        ReceiptNumber NVARCHAR(20) PRIMARY KEY NOT NULL,
        SerialNumber INT IDENTITY NOT NULL,
        SumOfBankTransfer INT NOT NULL,
        TransferDate DATE NOT NULL,
        Proof NVARCHAR(100) NOT NULL,
        ProofNumber NVARCHAR(30) NOT NULL,
        AccountNumber NVARCHAR(15) NOT NULL
    )`)

    await disconnect();

}

module.exports = { createTables }

