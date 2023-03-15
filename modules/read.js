const {getByField} = require('../services/sql/sql-operations')

async function getReceiptByReceiptNumber(id) {
    let res = await getByField('ReceiptNumber', id)
    return res;
}

module.exports = { getReceiptByReceiptNumber }
