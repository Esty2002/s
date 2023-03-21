    // BEGIN TRAN
    //     DECLARE @counter INT
    //     SET @counter = 1        
    //     IF(SELECT Disabled FROM BasicDetails WHERE ReceiptNumber = '${ReceiptNumber}')='False'

    //     WHILE (SELECT COUNT(*) AS rowNumber FROM 
    //     (SELECT PaymentId AS PaymentId
    //     FROM NormalizationTable
    //     WHERE ReceiptNumber = 12) SQ) >= @counter  
        
    //     BEGIN

    //     IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
    //     FROM NormalizationTable
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
    //     ORDER BY PaymentId)SQ
    //     ORDER BY SQ.PaymentId DESC)  = 1
    //     UPDATE Cash 
    //     SET Disabled ='True',
    //          DeleteDate = GETDATE()
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
        
        
    //     IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
    //     FROM NormalizationTable
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
    //     ORDER BY PaymentId)SQ
    //     ORDER BY SQ.PaymentId DESC)  = 2
    //     UPDATE Cheque 
    //     SET Disabled ='True',
    //          DeleteDate = GETDATE()
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
             
    //     IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
    //     FROM NormalizationTable
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
    //     ORDER BY PaymentId)SQ
    //     ORDER BY SQ.PaymentId DESC)  = 3
    //     UPDATE Credit 
    //     SET Disabled ='True',
    //          DeleteDate = GETDATE()
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
             
    //     IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
    //     FROM NormalizationTable
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
    //     ORDER BY PaymentId)SQ
    //     ORDER BY SQ.PaymentId DESC)  = 4
    //     UPDATE StandingOrder 
    //     SET Disabled ='True',
    //          DeleteDate = GETDATE()
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
             
             
    //     IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@counter) PaymentId AS PaymentId
    //     FROM NormalizationTable
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
    //     ORDER BY PaymentId)SQ
    //     ORDER BY SQ.PaymentId DESC)  = 5
    //     UPDATE BankTransfer 
    //     SET Disabled ='True',
    //          DeleteDate = GETDATE()
    //     WHERE ReceiptNumber = '${ReceiptNumber}'     
        
    //     SET @counter = @counter+1
    //     END 
        
    //     IF(SELECT Disabled FROM BasicDetails WHERE ReceiptNumber = '${ReceiptNumber}')='False'
    //     UPDATE BasicDetails 
    //     SET Disabled ='True',
    //          DeleteDate = GETDATE()
    //     WHERE ReceiptNumber = '${ReceiptNumber}'
                  
    //     COMMIT
              