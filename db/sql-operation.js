const { connect, disconnect, getConnection } = require('./sql-connection')
//פונקציה שמחזירה את כל הנתונים מטבלה מסוימת
async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE Disabled='1'`)
    await disconnect()
    return result;
}
// SQL פונקציה  שמכניסה נתונים ל
async function insert(table, columns, values) {
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${table}(${columns}) VALUES (${values})`)
    await disconnect()
    return result;
}
//פונקציה שמחזירה שדות לפי תנאי
async function getByValues(table, column, code) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE ${column} = '${code}'`)
    await disconnect()
    return result;
}
// פונקצית מחיקה
async function del(title, code, name, date) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET DisableUser='${name}' ,Disabled='0',DisabledDate='${date}'  WHERE SupplierCode = '${code}'`)
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
//פונקציה המחזירה האם לקוח מסוים קיים עדדין
async function getIsDisabled(table, column, code) {
    await connect()
    const result = await getConnection().request().query(`SELECT Disabled FROM ${table} WHERE ${column} = '${code}'`)
    await disconnect()
    return result;
}
//פונקצית עדכון
async function update(title, field, value, code) {
    console.log(`UPDATE ${title} SET ${field}='${value}' WHERE SupplierCode = '${code}'`);
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET ${field}='${value}' WHERE SupplierCode = '${code}'`)
    await disconnect()
    return result;
}
//פונקצית מציאת ספק לפי נתוני חיפוש
async function allTheOption(table,column,code){
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE ${column}='${code}' AND Disabled='1'`)
    await disconnect()
    return result;
}
// async function insertSupplier(objectSupplier) {
//     await connect();
//     console.log("..................");
//     console.log(objectSupplier);
//     console.log("..................");
//     const result = await getConnection().request()
//     .input('SupplierCode', req.query.SupplierCode )
//     // .input('size', req.query.size ||NULL)
//     // .input('search', req.query.search || '')
//     // .input('orderBy', req.query.orderBy || 'Id')
//     // .input('orderDir', req.query.orderDir || 'DESC')
    
//     .execute(`usp_insertSupplier`);
//     await disconnect()
//     return result;
    
// }

module.exports = {allTheOption, getAll, insert, getByValues, del, getIsDisabled, setDate,update }

