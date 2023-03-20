const {deleteReceipt} = require('../services/sql/sql-operations')

async function deleteByReceiptNumber(receiptNumber){
   const response =  await deleteReceipt(receiptNumber);  
   return response;
}

module.exports = {deleteByReceiptNumber}
