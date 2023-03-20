// DECLARE @counter INT
//         SET @counter = 1        
        
//         WHILE (SELECT COUNT(*) AS rowNumber FROM 
//         (SELECT PaymentId AS PaymentId
//         FROM NormalizationTable
//         WHERE ReceiptNumber = 12) SQ) >= @counter  
        
//         BEGIN
        
        
//         UPDATE (SELECT TOP 1 PaymentType 
//           FROM (SELECT TOP (@counter) PaymentId AS PaymentId
//                     FROM NormalizationTable
//                   WHERE ReceiptNumber = 12
//                   ORDER BY PaymentId)SQ JOIN  PaymentTypes pt  ON pt.PaymentId = SQ.PaymentId 
//                   ORDER BY SQ.PaymentId DESC) 
//         SET Disabled ='True',
//              DeleteDate = GETDATE()
//         WHERE ReceiptNumber = '${ReceiptNumber}'       
        
//         SET @counter = @counter+1
//         END
        
//         UPDATE BasicDetails 
//         SET Disabled ='True',
//              DeleteDate = GETDATE()
//         WHERE ReceiptNumber = '${ReceiptNumber}'        
        