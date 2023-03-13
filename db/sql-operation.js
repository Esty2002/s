const { connect, disconnect, getConnection} = require('./sql-connection')

async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`select * from ${table}`)
    await disconnect()
    return result;
}
module.exports = {  getAll }