const { create, read } = require('../services/sql/sql-operations');

async function createReceipts(obj) {
    _ = await create['BasicReceipt'](obj);
};

async function createCashReceiptMod(obj) {
    _ = await create['Cash'](obj);
};

async function createChequeMod(obj) {
    _ = await create['Cheque'](obj);
};

async function createCreditReceiptMod(obj) {
    _ = await create['Credit'](obj);
};

async function createStandingOrderMod(obj) {
    _ = await create['StandingOrder'](obj);
};

async function createBankTransferMod(obj) {
    _ = await create['BankTransfer'](obj);
};

async function getReceiptNumberMod() {
    _ = await read['MaxReceiptNumber']();
};

module.exports = {
    createReceipts,
    createCreditReceiptMod,
    createCashReceiptMod,
    createCreditReceiptMod,
    createBankTransferMod,
    createChequeMod,
    createStandingOrderMod,
    getReceiptNumberMod
};
