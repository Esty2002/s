const { getConnection, connect, disconnect } = require('./sql-connection');

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


};

const create = {
     BasicReceipt: async function (obj) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', obj.ReceiptNumber)
               .input('ClientCode', obj.ClientCode)
               .input('DateReceipt', obj.DateReceipt)
               .input('TotalSum', obj.TotalSum)
               .input('UserName', obj.UserName)
               .input('Comments', obj.Comments)
               .input('InsertDate', obj.InsertDate)
               .input('Disabled', 'False')
               .input('DeleteDate', null)
               .execute(`usp_createReceipt`)
          disconnect();
          return result;
     },
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
};

const remove = {

     All: async function (ReceiptNumber) {
          await connect();
          const result = await getConnection().request()
               .input('ReceiptNumber', ReceiptNumber).execute('DeleteReceiptPRO');
          disconnect();
          return result;
     },
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

};

const read = {

     All: async function (table = 'BasicDetails') {
          await connect();
          const result = await getConnection().request().query(`SELECT TOP 10 ReceiptNumber,ClientCode,DateReceipt,TotalSum,UserName  FROM ${table} ORDER BY DateReceipt DESC`);
          disconnect();
          return result;
     },
     ByPaymentType: async function (table = 'BasicDetails', value = 0) {
          await connect();
          const result = await getConnection().request().query(`SELECT ReceiptNumber,ClientCode,DateReceipt,TotalSum,UserName
          FROM ${table}
          WHERE 
          (ReceiptNumber IN(select ReceiptNumber from NormalizationTable
          WHERE ${value}=PaymentId)) `);
          disconnect();
          return result;
     },
     ByOption: async function (table = 'BasicDetails', option = null, value = null) {
          await connect();
          const result = await getConnection().request().query(`SELECT ReceiptNumber,ClientCode,DateReceipt,TotalSum,UserName
          FROM ${table} WHERE ${option}='${value}'`);
          disconnect();
          return result;
     },
     ByReceiptNumber: async function (rn) {
          await connect();
          let result = await getConnection().request()
               .input('Rn', rn)
               .execute(`pro_ReadReceipt`);
          disconnect();
          return result;
     },
     MaxReceiptNumber: async function () {
          await connect();
          const result = await getConnection().request().query(`
         SELECT MAX(ReceiptNumber) FROM BasicDetails
         `);
          disconnect();
          return result.recordset[0][''];
     }

};

module.exports = {
     create,
     read,
     update,
     remove
};
