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