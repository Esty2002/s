const { getConnection, connect, disconnect } = require("./sql-connection");


async function selectFromSql(select, table, condition) {


    await connect()
    const result = await getConnection().request().query(`SELECT ${select} FROM ${table} WHERE ${condition}`)
    disconnect()
    if (result) {
        return result.recordset
    }
    else
        throw new Error('not found')
}

async function addToSql(table, values) {
    console.log("hello");

    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${table} VALUES ${values}`)
    disconnect()
    if (result) {
        return result.recordset
    }
    else
        throw new Error('not found')
}

async function updateInSql(table, set, condition) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${table} SET ${set} WHERE ${condition}`)
    disconnect()
    if (result) {
        return result.recordset
    }
    else
        throw new Error('not found')
}

module.exports = { selectFromSql, addToSql, updateInSql }