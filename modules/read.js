const { getByReceiptNumber } = require('../services/sql/sql-operations');

async function getReceiptByReceiptNumber(rn) {
    let res = await getByReceiptNumber(rn);
    return res;
}

module.exports = { getReceiptByReceiptNumber };
