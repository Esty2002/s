const { update, create, remove } = require('../services/sql/sql-operations');

async function updateReceipt(obj) {
    update[obj.PaymentType](obj);
}

async function createReceipt(obj) {
    create[obj.PaymentType](obj);
}

async function deleteReceipt(obj) {
    remove[obj.PaymentType](obj);
}

module.exports = { updateReceipt, createReceipt, deleteReceipt };
