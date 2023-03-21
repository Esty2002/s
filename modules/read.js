const { read } = require('../services/sql/sql-operations');

async function getReceiptByReceiptNumber(rn) {
    let res = await read['ByReceiptNumber'](rn);
    return res;
};

async function getAll() {
    const list = await read['All']();
    return list;
};

async function getByOption(table, column, value) {
    const list = await read['ByOption']('BasicDetails', column, value);
    return list;
};

async function getByPaymentType(table, value) {
    const list = await read['ByPaymentType']('BasicDetails', value);
    return list;
};

module.exports = { getByOption, getAll, getByPaymentType, getReceiptByReceiptNumber }
