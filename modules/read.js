const { getByReceiptNumber } = require('../services/sql/sql-operations');

const sql_operation = require('../services/sql/sql-operations')

async function getReceiptByReceiptNumber(rn) {
    let res = await getByReceiptNumber(rn);
    return res;
}

async function getAll() {
    const list = await sql_operation.getAll()
    console.log(list );
    return list
}

async function getByOption(table,column, value) {
    const list = await sql_operation.getByOption('BasicDetails', column, value)
    console.log(list );
    return list
}

async function getByPaymentType(table, value) {
    const list = await sql_operation.getByPaymentType('BasicDetails', value)
    console.log(list );
    return list
}
module.exports = { getByOption, getAll, getByPaymentType ,getReceiptByReceiptNumber}
