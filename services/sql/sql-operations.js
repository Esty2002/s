require('dotenv').config()
const { getConnection, connect, disconnect } = require('./sql-connection');
const { SQL_SERVER, SQL_DBNAME, SQL_USERNAME, SQL_PASSWORD, SQL_PORT } = process.env;

async function deleteReceipt(ReceiptNumber) {
    await connect();
    const result = await getConnection().request()
        .query(`DECLARE @counter INT, @rowNumber INT
        SET @counter = 1
        SET @rowNumber = 1
        
        
        WHILE (SELECT COUNT(*) AS rowNumber FROM 
        (SELECT PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ReceiptNumber = 12) SQ) >= @counter  
        
        BEGIN
        
        IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ReceiptNumber = '${ReceiptNumber}'
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 1
        UPDATE Cash 
        SET Disabled ='True',
             DeleteDate = GETDATE()
        WHERE ReceiptNumber = '${ReceiptNumber}'
        
        IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ReceiptNumber = '${ReceiptNumber}'
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 2
        UPDATE Cheque 
        SET Disabled ='True',
             DeleteDate = GETDATE()
        WHERE ReceiptNumber = '${ReceiptNumber}'
        
        IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ReceiptNumber = '${ReceiptNumber}'
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 3
        UPDATE Credit 
        SET Disabled ='True',
             DeleteDate = GETDATE()
        WHERE ReceiptNumber = '${ReceiptNumber}'
        
        IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ReceiptNumber = '${ReceiptNumber}'
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 4
        UPDATE StandingOrder 
        SET Disabled ='True',
             DeleteDate = GETDATE()
        WHERE ReceiptNumber = '${ReceiptNumber}'
        
        
        IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ReceiptNumber = '${ReceiptNumber}'
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 5
        UPDATE BankTransfer 
        SET Disabled ='True',
             DeleteDate = GETDATE()
        WHERE ReceiptNumber = '${ReceiptNumber}'
        
        SET @rowNumber = @rowNumber+1
        SET @counter = @counter+1
        END
        
        UPDATE BasicDetails 
        SET Disabled ='True',
             DeleteDate = GETDATE()
        WHERE ReceiptNumber = '${ReceiptNumber}'        
        `);
    disconnect();
  
    return result;
}

module.exports = { deleteReceipt }