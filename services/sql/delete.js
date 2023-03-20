// IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
// FROM NormalizationTable
// WHERE ReceiptNumber = '${ReceiptNumber}'
// ORDER BY PaymentId)SQ
// ORDER BY SQ.PaymentId DESC)  = 1
// UPDATE Cash 
// SET Disabled ='True',
//      DeleteDate = GETDATE()
// WHERE ReceiptNumber = '${ReceiptNumber}'

// IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
// FROM NormalizationTable
// WHERE ReceiptNumber = '${ReceiptNumber}'
// ORDER BY PaymentId)SQ
// ORDER BY SQ.PaymentId DESC)  = 2
// UPDATE Cheque 
// SET Disabled ='True',
//      DeleteDate = GETDATE()
// WHERE ReceiptNumber = '${ReceiptNumber}'

// IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
// FROM NormalizationTable
// WHERE ReceiptNumber = '${ReceiptNumber}'
// ORDER BY PaymentId)SQ
// ORDER BY SQ.PaymentId DESC)  = 3
// UPDATE Credit 
// SET Disabled ='True',
//      DeleteDate = GETDATE()
// WHERE ReceiptNumber = '${ReceiptNumber}'

// IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
// FROM NormalizationTable
// WHERE ReceiptNumber = '${ReceiptNumber}'
// ORDER BY PaymentId)SQ
// ORDER BY SQ.PaymentId DESC)  = 4
// UPDATE StandingOrder 
// SET Disabled ='True',
//      DeleteDate = GETDATE()
// WHERE ReceiptNumber = '${ReceiptNumber}'


// IF(SELECT TOP 1 PaymentId FROM (SELECT TOP (@rowNumber) PaymentId AS PaymentId
// FROM NormalizationTable
// WHERE ReceiptNumber = '${ReceiptNumber}'
// ORDER BY PaymentId)SQ
// ORDER BY SQ.PaymentId DESC)  = 5
// UPDATE BankTransfer 
// SET Disabled ='True',
//      DeleteDate = GETDATE()
// WHERE ReceiptNumber = '${ReceiptNumber}'