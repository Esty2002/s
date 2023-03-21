const { remove } = require('../services/sql/sql-operations');

async function deleteByReceiptNumber(receiptNumber) {
   const response = await remove['All'](receiptNumber);
   return response;
};

module.exports = { deleteByReceiptNumber };
