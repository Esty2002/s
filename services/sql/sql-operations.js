const { getConnection, connect, disconnect } = require('./sql-connection');

async function getAll() {
    await connect();
    const result = await getConnection().request().query('SELECT DISTINCT B.ReceiptNumber, B.ClientCode, B.Date, B.TotalSum, PT.PaymentType FROM BasicDetails B JOIN PaymentTypes PT ON B.PaymentId=PT.PaymentId');
    disconnect();
    return result;
}
async function getByField(field, value) {
    await connect();
    const result = await getConnection().request().query(`SELECT DISTINCT B.ReceiptNumber, B.ClientCode, B.Date, B.TotalSum, PT.PaymentType FROM BasicDetails B JOIN PaymentTypes PT ON B.PaymentId=PT.PaymentId WHERE B.${field}=${value}`)
    disconnect();
    return result;
}

async function update(table, column, value, columnCond, valueCond) {
    await connect();
    const result = await getConnection().request().query(`UPDATE ${table} SET ${column} = ${value} WHERE ${columnCond}=${valueCond}`);
    disconnect();
    return result;

}

module.exports = { getAll, getByField, update };
