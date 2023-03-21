require('dotenv').config()
const { getConnection, connect, disconnect } = require('./sql-connection');

async function deleteReceipt(ReceiptNumber) {
     await connect();
     const result = await getConnection().request()
     .input('ReceiptNumber', ReceiptNumber).execute('DeleteReceiptPRO');  
     disconnect();
     return result;
}

module.exports = { deleteReceipt }
//חשבונית בסיסית
async function createReceiptSql(obj){
console.log({obj});
    await connect();   
    const result=await getConnection().request()
    .input('ReceiptNumber',obj.ReceiptNumber)
    .input('ClientCode',obj.ClientCode)
    .input('DateReceipt','19/03/2023')
    .input('TotalSum',obj.TotalSum)
    .input('UserName',obj.UserName)
    .input('Comments',obj.Comments) 
    .input('InsertDate',obj.InsertDate) 
    .input('Disabled','False')
    .input('DeleteDate',null)   
    .execute(`usp_createReceipt`)
    disconnect();
    return result;
}
//מזומן
async function createCashReceiptsql(obj){
    console.log(obj);
    await connect();   
    const result=await getConnection().request()
    .input('ReceiptNumber','123')
    .input('SumOfCash',obj.SumOfCash)
    .input('Disabled','False')
    .input('DeleteDate',null)   
    .execute(`CreateCashReceiptPRO`)
    disconnect();
    return result;
}
//כרטיס אשראיVVVVVVVV
async function createCreditReceiptsql(obj){
    await connect();   
    const result=await getConnection().request()
    .input('ReceiptNumber','123')
    .input('SumOfCredit',obj.SumOfCredit)
    .input('CreditNumber',obj.CreditNumber)
    .input('CardType','obj.TotalSum')
    .input('OwnerCard',obj.OwnerCard)
    .input('IdOwnerCard',obj.IdOwnerCard) 
    .input('Validity',obj.Validity) 
    .input('PaymentMethod','רגיל') 
    .input('PaymentsSum',2) 
    .input('CardName',obj.CardName) 
    .input('Disabled','False')
    .input('DeleteDate',null)   
    .execute(`CreateCrditReceiptPRO`)
    disconnect();
    return result;
}
//שיקVVVVVVVVVVVVVVVV
async function createChequeReceiptsql(obj){
    await connect();   
    const result=await getConnection().request()
    .input('ReceiptNumber','123')
    .input('SumOfCheque',obj.SumOfCheque)
    .input('BankNumber',obj.BankNumber)
    .input('BankBranch',obj.BankBranch)
    .input('AccountNumber',obj.AccountNumber)
    .input('UntilDate',obj.UntilDate)
    .input('DocumentUrl',obj.DocumentUrl)
    .input('Disabled','False')
    .input('DeleteDate',null)   
    .execute(`CreateChequeReceiptPRO`)
    disconnect();
    return result;
}
//העברה בנקאית
async function createBankTransferReceiptsql(obj){
console.log(obj);
    await connect();   
    const result=await getConnection().request()
    .input('ReceiptNumber','123')
    .input('SumOfBankTransfer',obj.SumOfBankTransfer)   
    .input('TransferDate',obj.TransferDate) 
    .input('Proof',obj.Proof) 
    .input('ProofNumber',obj.ProofNumber) 
    .input('AccountNumber',obj.AccountNumber) 
    .input('Disabled','False')
    .input('DeleteDate',null)   
    .execute(`CreateBankTransferReceiptPRO`)
    disconnect();
    return result;
}
//הוראת קבע
async function createStandingOrderReceiptsql(obj){
    await connect();   
    const result=await getConnection().request()
    .input('ReceiptNumber','123')
    .input('SumOfStandingOrder',obj.SumOfStandingOrder)
    .input('StandingOrderType',obj.StandingOrderType)
    .input('AccountNumberOrCard',obj.AccountNumberOrCard)
    .input('UntilDate',obj.UntilDate)
    .input('ProofBackFromBank',obj.ProofBackFromBank)
    .input('Disabled','False')
    .input('DeleteDate',null)   
    .execute(`CreateStandingOrderReceiptPRO`)
    disconnect();
    return result;
}
async function getReceiptNumbersql(){
    await connect(); 
    const result=await getConnection().request().query(`
    SELECT MAX(ReceiptNumber) FROM BasicDetails
    `)
    disconnect();
    console.log(result.recordset[0]['']);
    return result.recordset[0][''];  

}
module.exports={
createReceiptSql ,
createCreditReceiptsql ,
createBankTransferReceiptsql,
createCashReceiptsql,
createChequeReceiptsql,
createStandingOrderReceiptsql,
getReceiptNumbersql}
