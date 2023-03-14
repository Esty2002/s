const { connect, disconnect, getConnection } = require('./sql-connection')

async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table}`)
    await disconnect()
    return result;
}

async function insert(table, columns, values) {
    console.log('values  '+values);
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${table}(${columns}) VALUES (${values})`)
    await disconnect()
    return result;
}

async function getByValues(table, column, code) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE ${column} = '${code}'`)
    await disconnect()
    return result;
}

async function getIsDisabled(table, column, code) {
    await connect()
    const result = await getConnection().request().query(`SELECT Disabled FROM ${table} WHERE ${column} = '${code}'`)
    await disconnect()
    return result;
}

async function setDate() {
    await connect()
    const result = await getConnection().request().query(`SELECT CONVERT(VARCHAR(20),getdate(),101) AS 'Today'`)
    await disconnect()
    return result;
}

async function update(title,field,value, code) {
    console.log(`UPDATE ${title} SET ${field}='${value}' WHERE SupplierCode = '${code}'`);
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET ${field}='${value}' WHERE SupplierCode = '${code}'`)
    await disconnect()
    return result;
}

module.exports = { getAll, insert, getByValues, getIsDisabled, setDate,update }
