const { connect, disconnect, getConnection} = require('./sql-connection')

async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE Disabled='1'`)
    await disconnect()
    return result;
}

async function insert(table,columns,values){
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${table}(${columns}) VALUES (${values})`)
    await disconnect()
    return result;
}
async function allTheOption(table,column,code){
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE ${column}='${code}' AND Disabled='1'`)
    await disconnect()
    return result;
}
module.exports = { getAll ,insert,allTheOption}
