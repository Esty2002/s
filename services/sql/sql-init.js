require('dotenv').config();
const { getConnection, connect, disconnect } = require('./sql-connection');
const { SQL_SERVER, SQL_DBNAME, SQL_USERNAME, SQL_PASSWORD, SQL_PORT } = process.env;

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
};

async function createTables() {

    await connect(myconfig);
    _ = await getConnection().request().query(`IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${SQL_DBNAME}') CREATE DATABASE [${SQL_DBNAME}];`);
    disconnect();

    await connect();
    // --יצירת טבלה בסיסית
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'BasicDetails') CREATE TABLE [dbo].[BasicDetails](
        SerialNumber INT IDENTITY NOT NULL,
        ReceiptNumber NVARCHAR(20) PRIMARY KEY NOT NULL,
        ClientCode NVARCHAR(20) NOT NULL,
        DateReceipt NVARCHAR(20) NOT NULL,
        TotalSum FLOAT NOT NULL,
        UserName NVARCHAR(20) NOT NULL,
        Comments NVARCHAR(MAX) NULL,
        InsertDate NVARCHAR(20) NOT NULL,
        Disabled BIT NULL, 
        DeleteDate NVARCHAR(20) NULL
        )`);

    // --טבלת נרמול סוגי תשלום
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PaymentTypes') 
    CREATE TABLE [dbo].[PaymentTypes](
        SerialNumber INT IDENTITY PRIMARY KEY NOT NULL,
        PaymentId INT  NOT NULL,
        PaymentType NVARCHAR(20)  NOT NULL
    )
    IF(SELECT COUNT(*) FROM PaymentTypes)!=5
    INSERT INTO PaymentTypes
    VALUES(1, 'Cash'),
          (2, 'Cheque'),
          (3, 'Credit'),
          (4, 'StandingOrder'),
          (5, 'BankTransfer')
    `);

    // --טבלת נרמול מספרי קבלות וסוגי תשלום     
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'NormalizationTable') CREATE TABLE [dbo].[NormalizationTable](
        SerialNumber INT IDENTITY PRIMARY KEY NOT NULL,
        --ReceiptNumber NVARCHAR(20) FOREIGN KEY(ReceiptNumber) REFERENCES BasicDetails(ReceiptNumber)  NOT NULL,
        ReceiptNumber NVARCHAR(20)  NOT NULL,
        PaymentId INT  NOT NULL
    )`);

    // --טבלת מזומן
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Cash') CREATE TABLE [dbo].[Cash](
        SerialNumber INT IDENTITY PRIMARY KEY NOT NULL,
        --ReceiptNumber NVARCHAR(20) FOREIGN KEY(ReceiptNumber) REFERENCES NormalizationTable(ReceiptNumber)  NOT NULL,
        ReceiptNumber NVARCHAR(20) NOT NULL,
        SumOfCash FLOAT NOT NULL,
        Disabled BIT NOT NULL, 
        DeleteDate NVARCHAR(20) NULL
    )`);

    // --טבלת צק
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Cheque') CREATE TABLE [dbo].[Cheque](
        SerialNumber INT IDENTITY  PRIMARY KEY NOT NULL,
        --ReceiptNumber NVARCHAR(20) FOREIGN KEY(ReceiptNumber) REFERENCES NormalizationTable(ReceiptNumber)  NOT NULL,
        ReceiptNumber NVARCHAR(20) NOT NULL,
        SumOfCheque FLOAT NOT NULL,
        BankNumber NVARCHAR(10) NOT NULL,
        BankBranch NVARCHAR(10) NOT NULL,
        AccountNumber NVARCHAR(20)  NOT NULL,
        UntilDate NVARCHAR(20) NOT NULL,
        DocumentUrl NVARCHAR(20)NOT NULL,
        Disabled BIT NOT NULL, 
        DeleteDate NVARCHAR(20) NULL
    )`);

    // --טבלת אשראי
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Credit') CREATE TABLE [dbo].[Credit](
        SerialNumber INT IDENTITY  PRIMARY KEY NOT NULL,
        --ReceiptNumber NVARCHAR(20) FOREIGN KEY(ReceiptNumber) REFERENCES NormalizationTable(ReceiptNumber)  NOT NULL,
        ReceiptNumber NVARCHAR(20)  NOT NULL,
        SumOfCredit FLOAT NOT NULL,
        CreditNumber NVARCHAR(16)NOT NULL,
        CardType NVARCHAR(20)NOT NULL,
        OwnerCard NVARCHAR(40)NOT NULL,
        IdOwnerCard NVARCHAR(9)NOT NULL,
        Validity NVARCHAR(4)NOT NULL,
        PaymentMethod NVARCHAR(20)NOT NULL,
        PaymentsSum INT NOT NULL,
        CardName NVARCHAR(20)NOT NULL,
        Disabled BIT NOT NULL, 
        DeleteDate NVARCHAR(20) NULL
    )`);

    // --טבלת הו"ק    
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'StandingOrder') CREATE TABLE [dbo].[StandingOrder](
        SerialNumber INT IDENTITY PRIMARY KEY NOT NULL,
        --ReceiptNumber NVARCHAR(20) FOREIGN KEY(ReceiptNumber) REFERENCES NormalizationTable(ReceiptNumber)  NOT NULL,
        ReceiptNumber NVARCHAR(20)  NOT NULL,
        SumOfStandingOrder FLOAT NOT NULL,
        StandingOrderType NVARCHAR(20)NOT NULL,
        AccountNumberOrCard NVARCHAR(40)NOT NULL,
        UntilDate NVARCHAR(20) NOT NULL,
        ProofBackFromBank NVARCHAR(20)NOT NULL,
        Disabled BIT NOT NULL, 
        DeleteDate NVARCHAR(20) NULL
    )`);

    // --טבלת העברה בנקאית      
    _ = await getConnection().request().query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'BankTransfer') CREATE TABLE [dbo].[BankTransfer](
        SerialNumber INT IDENTITY PRIMARY KEY NOT NULL,
        --ReceiptNumber NVARCHAR(20) FOREIGN KEY(ReceiptNumber) REFERENCES NormalizationTable(ReceiptNumber)  NOT NULL,
        ReceiptNumber NVARCHAR(20)  NOT NULL,
        SumOfBankTransfer FLOAT NOT NULL,
        TransferDate NVARCHAR(20) NOT NULL,
        Proof NVARCHAR(100) NOT NULL,
        ProofNumber NVARCHAR(30) NOT NULL,
        AccountNumber NVARCHAR(15) NOT NULL,
        Disabled BIT NOT NULL, 
        DeleteDate NVARCHAR(20) NULL
    )`);

    disconnect();

};

async function createProcedure() {
    await connect();

    _ = await getConnection().request().query(`(
        CREATE  PROCEDURE [dbo].[pro_CreateCash]	
            @ReceiptNumber NVARCHAR(20),
            @SumOfCash FLOAT,
            @Disabled BIT, 
            @DeleteDate DATE NULL
        AS
        BEGIN
            INSERT INTO [dbo].[Cash]
            VALUES (@ReceiptNumber,@SumOfCash,@Disabled,@DeleteDate)
            IF NOT EXISTS (SELECT * FROM NormalizationTable WHERE PaymentId=1 AND ReceiptNumber=@ReceiptNumber)
            BEGIN
            INSERT INTO NormalizationTable
            VALUES (@ReceiptNumber , 1)
            END
        END
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_CreateCheque]            
            @ReceiptNumber NVARCHAR(20),
            @SumOfCheque FLOAT,
            @BankNumber NVARCHAR(10),
            @BankBranch NVARCHAR(10),
            @AccountNumber NVARCHAR(20),
            @UntilDate  NVARCHAR(20),
            @DocumentUrl NVARCHAR(20),
            @Disabled BIT, 
            @DeleteDate DATE NULL
        AS
        BEGIN
                INSERT INTO [dbo].[Cheque]
                VALUES ( @ReceiptNumber,@SumOfCheque,@BankNumber,@BankBranch,@AccountNumber,@UntilDate,@DocumentUrl,@Disabled,@DeleteDate)
                IF NOT EXISTS (SELECT * FROM NormalizationTable WHERE PaymentId=2 AND ReceiptNumber=@ReceiptNumber)
                INSERT INTO NormalizationTable
                VALUES (@ReceiptNumber , 2)
        END
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_CreateCrdit]
    
            @ReceiptNumber NVARCHAR(20),
            @SumOfCredit INT ,
            @CreditNumber NVARCHAR(16),
            @CardType NVARCHAR(20) ,
            @OwnerCard NVARCHAR(40),
            @IdOwnerCard NVARCHAR(9),
            @Validity NVARCHAR(4),
            @PaymentMethod NVARCHAR(20),
            @PaymentsSum INT , 
            @CardName NVARCHAR(20),
            @Disabled BIT , 
            @DeleteDate NVARCHAR(20) NULL
            
        AS
        BEGIN
                INSERT INTO [dbo].[Credit]
                VALUES (@ReceiptNumber,@SumOfCredit, @CreditNumber, @CardType , @OwnerCard,@IdOwnerCard , @Validity,
                @PaymentMethod , @PaymentsSum ,@CardName , @Disabled,@DeleteDate)
                IF NOT EXISTS (SELECT * FROM NormalizationTable WHERE PaymentId=3 AND ReceiptNumber=@ReceiptNumber)
                INSERT INTO NormalizationTable
                VALUES (@ReceiptNumber , 3)
        END
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_CreateStandingOrder]	
           @ReceiptNumber NVARCHAR(20),
           @SumOfStandingOrder INT,
           @StandingOrderType NVARCHAR(20),
           @AccountNumberOrCard NVARCHAR(40),
           @UntilDate  NVARCHAR(20),
           @ProofBackFromBank NVARCHAR(20),
           @Disabled BIT, 
           @DeleteDate DATE NULL
        AS
        BEGIN
                INSERT INTO [dbo].[StandingOrder]
                VALUES (@ReceiptNumber,@SumOfStandingOrder ,@StandingOrderType,@AccountNumberOrCard,@UntilDate,@ProofBackFromBank,@Disabled,@DeleteDate)
                IF NOT EXISTS (SELECT * FROM NormalizationTable WHERE PaymentId=4 AND ReceiptNumber=@ReceiptNumber)
                INSERT INTO NormalizationTable
                VALUES (@ReceiptNumber , 4)
        END
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_CreateBankTransfer]
	            @ReceiptNumber NVARCHAR(20),
		        @SumOfBankTransfer FLOAT,
                @TransferDate  NVARCHAR(20),
                @Proof NVARCHAR(100),
                @ProofNumber NVARCHAR(30),
                @AccountNumber NVARCHAR(15),
                @Disabled BIT , 
                @DeleteDate NVARCHAR(20) NULL
		
        AS
        BEGIN
	        INSERT INTO [dbo].[BankTransfer]
	        VALUES (@ReceiptNumber,@SumOfBankTransfer,@TransferDate,
	        @Proof,@ProofNumber,@AccountNumber,@Disabled,@DeleteDate)
	        IF NOT EXISTS (SELECT * FROM NormalizationTable WHERE PaymentId=5 AND ReceiptNumber=@ReceiptNumber)
	        INSERT INTO NormalizationTable
	        VALUES (@ReceiptNumber , 5)
        END
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_ReadReceipt]
            @Rn INT
        AS
        BEGIN
            SELECT 'BasicDetails' AS PaymentType,ReceiptNumber, ClientCode, DateReceipt, TotalSum, UserName, Comments, InsertDate
            FROM BasicDetails
            WHERE ReceiptNumber=@Rn AND Disabled='False'
            DECLARE @counter INT
            SET @counter = 1
            WHILE (SELECT  COUNT(*) AS rowNumber FROM 
            (SELECT PaymentId AS PaymentId
            FROM NormalizationTable
            WHERE ReceiptNumber=@Rn) SQ) >= @counter  
            
            BEGIN
            
            IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
            FROM NormalizationTable
            WHERE ReceiptNumber=@Rn
            ORDER BY PaymentId)SQ
            ORDER BY SQ.PaymentId DESC)  = 1)
            SELECT 'Cash' AS PaymentType, SumOfCash 
            FROM Cash 
            WHERE Disabled='False' AND ReceiptNumber=@Rn
    
            IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
            FROM NormalizationTable
            WHERE ReceiptNumber=@Rn
            ORDER BY PaymentId)SQ
            ORDER BY SQ.PaymentId DESC)  = 2)
            SELECT 'Cheque' AS PaymentType,SumOfCheque, BankNumber, BankBranch, AccountNumber, UntilDate, DocumentUrl 
            FROM Cheque
            WHERE Disabled='False' AND ReceiptNumber=@Rn
    
            IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
            FROM NormalizationTable
            WHERE ReceiptNumber=@Rn
            ORDER BY PaymentId)SQ
            ORDER BY SQ.PaymentId DESC)  = 3)
            SELECT 'Credit' AS PaymentType, SumOfCredit, CreditNumber, CardType, OwnerCard, IdOwnerCard, Validity, PaymentMethod, PaymentsSum, CardName
            FROM Credit 
            WHERE Disabled='False' AND ReceiptNumber=@Rn
            
    
            IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
            FROM NormalizationTable
            WHERE ReceiptNumber=@Rn
            ORDER BY PaymentId)SQ
            ORDER BY SQ.PaymentId DESC)  = 4)
            SELECT 'StandingOrder' AS PaymentType,SumOfStandingOrder, StandingOrderType,AccountNumberOrCard, UntilDate, ProofBackFromBank
            FROM StandingOrder
            WHERE Disabled='False' AND ReceiptNumber=@Rn
    
            IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
            FROM NormalizationTable
            WHERE ReceiptNumber=@Rn
            ORDER BY PaymentId)SQ
            ORDER BY SQ.PaymentId DESC)  = 5)
            SELECT 'BankTransfer' AS PaymentType, SumOfBankTransfer, TransferDate, Proof, ProofNumber, AccountNumber
            FROM BankTransfer 
            WHERE Disabled='False' AND ReceiptNumber=@Rn
    
    
            SET @counter = @counter+1
            END
        END
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_UpdateBasicDetails]
            @ReceiptNumber INT,
            @ClientCode INT,
            @DateReceipt NVARCHAR(20),
            @TotalSum FLOAT,
            @UserName NVARCHAR(20),
            @Comments NVARCHAR(20),
            @InsertDate NVARCHAR(20)
        AS
      
        EGIN
		    UPDATE BasicDetails
		    SET ClientCode=@ClientCode,
				DateReceipt=@DateReceipt,
				TotalSum=@TotalSum,
				UserName=@UserName,
				Comments=@Comments,
				InsertDate=@InsertDate
		    WHERE ReceiptNumber = @ReceiptNumber  AND  Disabled != 'True'
        END
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_UpdateCash]
            @ReceiptNumber INT,
            @SumOfCash INT
        AS
        BEGIN
		    UPDATE Cash
		    SET SumOfCash=@SumOfCash
			WHERE ReceiptNumber = @ReceiptNumber  AND  Disabled != 'True'
        END
    `);
   
    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_UpdateCheque]
            @ReceiptNumber INT,
            @SumOfCheque FLOAT,
            @BankNumber NVARCHAR(20),
            @BankBranch INT,
            @AccountNumber INT,
            @UntilDate NVARCHAR(20),
            @DocumentUrl NVARCHAR(20)
    
        AS
        BEGIN
            UPDATE Cheque
            SET SumOfCheque=@SumOfCheque,
            BankNumber =@BankNumber,
            BankBranch=@BankBranch,
            AccountNumber=@AccountNumber,
            UntilDate=@UntilDate,
            DocumentUrl=@DocumentUrl
            WHERE ReceiptNumber = @ReceiptNumber  AND  Disabled != 'True'
        END
    `);
    
    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_UpdateCredit]
            @ReceiptNumber INT,
            @SumOfCredit INT,
            @CreditNumber INT,
            @CardType  NVARCHAR(20),
            @OwnerCard NVARCHAR(20),
            @IdOwnerCard NVARCHAR(20),
            @Validity  NVARCHAR(20),
            @PaymentMethod NVARCHAR(20),
            @PaymentsSum INT,
            @CardName NVARCHAR(20)
        
        AS
        BEGIN
            UPDATE Credit
            SET SumOfCredit = @SumOfCredit,
            CreditNumber=@CreditNumber,
            CardType = @CardType ,
            OwnerCard = @OwnerCard,
            IdOwnerCard = @IdOwnerCard ,
            Validity  =@Validity,
            PaymentMethod =@PaymentMethod,
            PaymentsSum =@PaymentsSum,
            CardName =@CardName
            WHERE ReceiptNumber = @ReceiptNumber  AND  Disabled != 'True'
        END
    `);
           
    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_UpdateStandingOrder]
            @ReceiptNumber INT,
            @SumOfStandingOrder INT,
            @StandingOrderType NVARCHAR(20),
            @AccountNumberOrCard NVARCHAR(20), 
            @UntilDate NVARCHAR(20),
            @ProofBackFromBank NVARCHAR(20)
        AS
        BEGIN
            UPDATE StandingOrder
            SET SumOfStandingOrder = @SumOfStandingOrder,
                StandingOrderType = @StandingOrderType,
                AccountNumberOrCard=@AccountNumberOrCard,
                UntilDate=@UntilDate,
                ProofBackFromBank=@ProofBackFromBank
            WHERE ReceiptNumber = @ReceiptNumber  AND  Disabled != 'True'
        END 
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_UpdateBankTransfer]
	        @ReceiptNumber INT,
	        @SumOfBankTransfer INT,
	        @TransferDate NVARCHAR(20),
	        @Proof NVARCHAR(100),
	        @ProofNumber NVARCHAR(30),
	        @AccountNumber NVARCHAR(15)
        AS
        BEGIN
			UPDATE BankTransfer
			SET SumOfBankTransfer=@SumOfBankTransfer,
			TransferDate=@TransferDate,
			Proof=@Proof,
			ProofNumber=@ProofNumber,
			AccountNumber=@AccountNumber
			WHERE ReceiptNumber = @ReceiptNumber  AND  Disabled != 'True'
        END 
    `);

    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_DeleteCash]
            @ReceiptNumber NVARCHAR(30)
        AS  
        BEGIN
            IF(SELECT Disabled FROM Cash WHERE ReceiptNumber = @ReceiptNumber)='False'
            UPDATE Cash 
            SET Disabled ='True',
                 DeleteDate = GETDATE()
            WHERE ReceiptNumber = @ReceiptNumber            
        END
    `);
    
    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_DeleteCheque]
            @ReceiptNumber NVARCHAR(30)
        AS  
        BEGIN
            IF(SELECT Disabled FROM Cheque WHERE ReceiptNumber = @ReceiptNumber)='False'
            UPDATE Cheque 
            SET Disabled ='True',
                 DeleteDate = GETDATE()
            WHERE ReceiptNumber = @ReceiptNumber            
        END
    `);
    
    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_DeleteCredit]
            @ReceiptNumber NVARCHAR(30)
        AS  
        BEGIN
            IF(SELECT Disabled FROM Credit WHERE ReceiptNumber = @ReceiptNumber)='False'
            UPDATE Credit 
            SET Disabled ='True',
                 DeleteDate = GETDATE()
            WHERE ReceiptNumber = @ReceiptNumber           
        END
    `);
    
    _ = await getConnection().request().query(`(
    
        CREATE PROCEDURE [dbo].[pro_DeleteBankTransfer]
            @ReceiptNumber NVARCHAR(30)
        AS  
        BEGIN
            IF(SELECT Disabled FROM BankTransfer WHERE ReceiptNumber = @ReceiptNumber)='False'
            UPDATE BankTransfer 
            SET Disabled ='True',
                     DeleteDate = GETDATE()
            WHERE ReceiptNumber = @ReceiptNumber           
        END
    `);
       
    _ = await getConnection().request().query(`(
        CREATE PROCEDURE [dbo].[pro_DeleteStandingOrder]
            @ReceiptNumber NVARCHAR(30)
        AS  
        BEGIN
            IF(SELECT Disabled FROM StandingOrder WHERE ReceiptNumber = @ReceiptNumber)='False'
            UPDATE StandingOrder 
            SET Disabled ='True',
                 DeleteDate = GETDATE()
            WHERE ReceiptNumber = @ReceiptNumber            
        END
    `);
                       
    disconnect();

};

module.exports = { createTables, createProcedure };
