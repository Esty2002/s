const { getConnection, connect, disconnect } = require("../../services/sql/sql-connection");


async function selectFromSql(select, table, condition) {
    console.log("select ", select);
    console.log("table ", table);
    console.log("condition ", condition);

    await connect()
    const result = await getConnection().request().query(`SELECT ${select} FROM ${table} WHERE ${condition}`)
    console.log("sql ",result.recordset);
    disconnect()
    if (result) {
        return result.recordset
    }
    else
        throw new Error('not found')
}

async function addToSql(table, values) {
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${table} VALUES ${values}`)
    console.log(result.recordset);
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
    console.log(result.recordset);
    disconnect()
    if (result) {
        return result.recordset
    }
    else
        throw new Error('not found')
}

module.exports = { selectFromSql, addToSql, updateInSql }