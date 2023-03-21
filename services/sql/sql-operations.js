const { getConnection, connect, disconnect } = require('./sql-connection');

async function getByReceiptNumber(rn) {
     await connect();
     let result = await getConnection().request()
          .input('Rn', rn)
          .execute(`pro_ReadReceipt`);
     disconnect();
     console.log('resultGet', result);
     return result;
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

module.exports = {
     getByReceiptNumber, update, create, remove
};
