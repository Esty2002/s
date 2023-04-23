const { update, create, remove } = require('../../services-receipt/sql/sql-operations');

async function updateReceipt(obj) {
    _ = await update[obj.PaymentType](obj);
};

async function createReceipt(obj) {
    _ = await create[obj.PaymentType](obj);
};

async function deleteReceipt(obj) {
    _ = await remove[obj.PaymentType](obj);
};

module.exports = { updateReceipt, createReceipt, deleteReceipt };
