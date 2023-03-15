const {deleteReceipt} = require('../services/sql/sql-operations')



async function deleteByReceiptNumber(receiptNumber){
   const response =  await deleteReceipt(receiptNumber);
   // console.log(response);
   // console.log({receiptNumber});
   return response;
}

module.exports = {deleteByReceiptNumber}