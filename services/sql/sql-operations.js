const { getConnection, connect, disconnect } = require('./sql-connection');

async function getAll() {
    await connect();
    const result = await getConnection().request().query('SELECT DISTINCT B.ReceiptNumber, B.ClientCode, B.Date, B.TotalSum, PT.PaymentType FROM BasicDetails B JOIN PaymentTypes PT ON B.PaymentId=PT.PaymentId');
    disconnect();
    return result;
}

// async function getByField(field, value) {
//     await connect();
//     const result = await getConnection().request().query(`
//     SELECT ReceiptNumber, ClientCode, DateReceipt, TotalSum, UserName, Comments, InsertDate
//     FROM BasicDetails
//     WHERE ${field}=${value} AND Disabled='False'`)
//     disconnect();
//     return result;
// }

async function getByField(field, value) {
    await connect();
    let result = await getConnection().request().query(`
    SELECT ReceiptNumber, ClientCode, DateReceipt, TotalSum, UserName, Comments, InsertDate
    FROM BasicDetails
    WHERE ${field}=${value} AND Disabled='False'
     DECLARE @counter INT
        SET @counter = 1
        
        
        WHILE (SELECT COUNT(*) AS rowNumber FROM 
        (SELECT PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ${field}=${value}) SQ) >= @counter  
        
        BEGIN
        
		IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ${field}=${value}
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 1)
        SELECT 'Cash' AS PaymentType, SumOfCash 
		FROM Cash 
		WHERE Disabled='False' AND ${field}=${value}

		IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ${field}=${value}
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 2)
        SELECT 'Cheque' AS PaymentType,SumOfCheque, BankNumber, BankBranch, AccountNumber, Date, DocumentUrl 
        FROM Cheque
        WHERE Disabled='False' AND ${field}=${value}

		IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ${field}=${value}
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 3)
        SELECT 'Credit' AS PaymentType, SumOfCredit, CreditNumber, CardType, OwnerCard, IdOwnerCard, Validity, PaymentMethod, PaymentsSum, CardName
		FROM Credit 
		WHERE Disabled='False' AND ${field}=${value}
		

		IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ${field}=${value}
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 4)
		SELECT 'StandingOrder' AS PaymentType,SumOfStandingOrder, StandingOrderType,AccountNumberOrCard, UntilDate, ProofBackFromBank
		FROM StandingOrder
		WHERE Disabled='False' AND ${field}=${value}

		IF((SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
        FROM NormalizationTable
        WHERE ${field}=${value}
        ORDER BY PaymentId)SQ
        ORDER BY SQ.PaymentId DESC)  = 5)
		SELECT 'BankTransfer' AS PaymentType, SumOfBankTransfer, TransferDate, Proof, ProofNumber, AccountNumber
		FROM BankTransfer 
		WHERE Disabled='False' AND ${field}=${value}


        SET @counter = @counter+1
		END`)

    disconnect();
    return result;
}




async function update(table, column, value, columnCond, valueCond) {
    await connect();
    const result = await getConnection().request().query(`UPDATE ${table} SET ${column} = ${value} WHERE ${columnCond}=${valueCond}`);
    disconnect();
    return result;

}

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
module.exports = { getAll, getByField, update, deleteReceipt };


