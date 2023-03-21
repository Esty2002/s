const { getConnection, connect, disconnect } = require('./sql-connection');

async function getByReceiptNumber(rn) {
     await connect();
     let result = await getConnection().request()
          .input('Rn', rn)
          .execute(`pro_ReadReceipt`);
     disconnect();
     return result;

}

async function deleteReceipt(ReceiptNumber) {
     await connect();
     const result = await getConnection().request()
     .input('ReceiptNumber', ReceiptNumber).execute('DeleteReceiptPRO');  
     disconnect();
     return result;
}

async function getAll(table = 'BasicDetails') {
    await connect()
    const result = await getConnection().request().query(`select top 10 ReceiptNumber,ClientCode,DateReceipt,TotalSum,UserName  from ${table} order by DateReceipt desc`)
    console.log(result+"  hello");
    disconnect()
    return result;
}

async function getByOption(table = 'BasicDetails', option = null, value = null) {
    await connect()
    const result = await getConnection().request().query(`select ReceiptNumber,ClientCode,DateReceipt,TotalSum,UserName
    from ${table} where ${option}='${value}'`)
    console.log(result);
    disconnect()
    return result
}
async function getByPaymentType(table = 'BasicDetails',value=0) {
    await connect()
    const result = await getConnection().request().query(`select ReceiptNumber,ClientCode,DateReceipt,TotalSum,UserName
    from ${table}
    where 
    (ReceiptNumber in(select ReceiptNumber from NormalizationTable
    where ${value}=PaymentId)) `)
    console.log(result+"  hello");
    disconnect()
    return result;
}

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

const update = {
     BasicDetails: async function (obj) {
          await connect();
          let result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('ClientCode', obj.ClientCode)
               .input('DateReceipt', obj.DateReceipt)
               .input('TotalSum', obj.TotalSum)
               .input('UserName', obj.UserName)
               .input('Comments', obj.Comments)
               .input('InsertDate', obj.InsertDate)
               .execute(`pro_UpdateBasicDetails`);
          disconnect();
          return result;
     },
     Cash: async function (obj) {
          await connect();
          let result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfCash', obj.SumOfCash)
               .execute(`pro_UpdateCash`);
          disconnect();
          return result;
     },
     Cheque: async function (obj) {
          await connect();
          let result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfCheque', obj.SumOfCheque)
               .input('BankNumber', obj.BankNumber)
               .input('BankBranch', obj.BankBranch)
               .input('AccountNumber', obj.AccountNumber)
               .input('UntilDate', obj.Date)
               .input('DocumentUrl', obj.DocumentUrl)
               .execute(`pro_UpdateCheque`);
          disconnect();
          return result;
     },
     Credit: async function (obj) {
          await connect();
          let result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfCredit', obj.SumOfCredit)
               .input('CreditNumber', obj.CreditNumber)
               .input('CardType', obj.CardType)
               .input('OwnerCard', obj.OwnerCard)
               .input('IdOwnerCard', obj.IdOwnerCard)
               .input('Validity', obj.Validity)
               .input('PaymentMethod', obj.PaymentMethod)
               .input('PaymentsSum', obj.PaymentsSum)
               .input('CardName', obj.CardName)
               .execute(`pro_UpdateCredit`);
          disconnect();
          return result;
     },
     StandingOrder: async function (obj) {
          await connect();
          let result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfStandingOrder ', obj.SumOfStandingOrder)
               .input('StandingOrderType', obj.StandingOrderType)
               .input('AccountNumberOrCard', obj.AccountNumberOrCard)
               .input('UntilDate', obj.UntilDate)
               .input('ProofBackFromBank', obj.ProofBackFromBank)
               .execute(`pro_UpdateStandingOrder`);
          disconnect();
          return result;
     },
     BankTransfer: async function (obj) {
          await connect();
          let result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfBankTransfer ', obj.SumOfBankTransfer)
               .input('TransferDate', obj.TransferDate)
               .input('Proof', obj.Proof)
               .input('ProofNumber', obj.ProofNumber)
               .input('AccountNumber', obj.AccountNumber)
               .execute(`pro_UpdateBankTransfer`);
          disconnect();
          return result;
     }


}

const create = {
     Cash: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfCash', obj.SumOfCash)
               .input('Disabled', 'False')
               .input('DeleteDate', null)
               .execute(`pro_CreateCash`);
          disconnect();
          return result;

     },
     Cheque: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfCheque', obj.SumOfCheque)
               .input('BankNumber', obj.BankNumber)
               .input('BankBranch', obj.BankBranch)
               .input('AccountNumber', obj.AccountNumber)
               .input('UntilDate', obj.UntilDate)
               .input('DocumentUrl', obj.DocumentUrl)
               .input('Disabled', 'False')
               .input('DeleteDate', null)
               .execute(`pro_CreateCheque`);
          disconnect();
          return result;
     },
     Credit: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfCredit', obj.SumOfCredit)
               .input('CreditNumber', obj.CreditNumber)
               .input('CardType', obj.CardType)
               .input('OwnerCard', obj.OwnerCard)
               .input('IdOwnerCard', obj.IdOwnerCard)
               .input('Validity', obj.Validity)
               .input('PaymentMethod', obj.PaymentMethod)
               .input('PaymentsSum', obj.PaymentsSum)
               .input('CardName', obj.CardName)
               .input('Disabled', 'False')
               .input('DeleteDate', null)
               .execute(`pro_CreateCrdit`);
          disconnect();
          return result;
     },
     StandingOrder: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfStandingOrder', obj.SumOfStandingOrder)
               .input('StandingOrderType', obj.StandingOrderType)
               .input('AccountNumberOrCard', obj.AccountNumberOrCard)
               .input('UntilDate', obj.UntilDate)
               .input('ProofBackFromBank', obj.ProofBackFromBank)
               .input('Disabled', 'False')
               .input('DeleteDate', null)
               .execute(`pro_CreateStandingOrder`);
          disconnect();
          return result;
     },
     BankTransfer: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('SumOfBankTransfer', obj.SumOfBankTransfer)
               .input('TransferDate', obj.TransferDate)
               .input('Proof', obj.Proof)
               .input('ProofNumber', obj.ProofNumber)
               .input('AccountNumber', obj.AccountNumber)
               .input('Disabled', 'False')
               .input('DeleteDate', null)
               .execute(`pro_CreateBankTransfer`);
          disconnect();
          return result;
     }
}

const remove = {
     Cash: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .execute(`pro_DeleteCash`);
          disconnect();
          return result;
     },
     Cheque: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .execute(`pro_DeleteCheque`);
          disconnect();
          return result;
     },
     Credit: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .execute(`pro_DeleteCredit`);
          disconnect();
          return result;
     },
     StandingOrder: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .execute(`pro_DeleteStandingOrder`);
          disconnect();
          return result;
     },
     BankTransfer: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .execute(`pro_DeleteBankTransfer`);
          disconnect();
          return result;
     }
}
module.exports={
deleteReceipt,
createReceiptSql ,
createCreditReceiptsql ,
createBankTransferReceiptsql,
createCashReceiptsql,
createChequeReceiptsql,
createStandingOrderReceiptsql,
getReceiptNumbersql,
getByOption,getAll ,
getByPaymentType ,
getByReceiptNumber, 
update,
create, 
remove}
