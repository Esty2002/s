const { connect, disconnect, getConnection } = require('./sql-connection')
//פונקציה שמחזירה את כל הנתונים מטבלה מסוימת
async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table}`)
    await disconnect()
    return result;
}
// SQL   פונקציה  שמכניסה נתונים 
async function insert(table, columns, values) {
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${table}(${columns}) VALUES (${values})`)
    await disconnect()
    return result;
}
//פונקציה שמחזירה שדות לפי תנאי
async function getByValues(table, column, code, title) {
    await connect()
    const result = await getConnection().request().query(`SELECT ${title} FROM ${table} WHERE ${column} = ${code}`)
    await disconnect()
    return result;
}
// פונקציה המעדכנת את שם המוחק
async function del(title, code, name) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET DisableUser='${name}'  WHERE SupplierCode = '${code}'`)
    await disconnect()
    return result;
}
// פונקציה המעדכנת אפשרי למחוק
async function changeDisabele(title, code) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET Disabled='0'  WHERE SupplierCode = '${code}'`)
    await disconnect()
    return result;
}
// פונקציה המעדכנת את תאריך המחיקה
async function changeDisabledDate(title, code, date) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET DisabledDate='${date}' WHERE SupplierCode = '${code}'`)
    await disconnect()
    return result;
}
// פונקציה המחזירה תאריך נוכחי
async function setDate() {
    await connect()
    const result = await getConnection().request().query(`SELECT CONVERT(VARCHAR(20),getdate(),101) AS 'Today'`)
    await disconnect()
    return result;
}



module.exports = { getAll, insert, getByValues, del, changeDisabele,changeDisabledDate,setDate }
