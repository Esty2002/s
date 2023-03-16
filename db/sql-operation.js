const { connect, disconnect, getConnection } = require('./sql-connection')
//פונקציה שמחזירה את כל הנתונים מטבלה מסוימת
async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE Disabled='0'`)
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
    const result = await getConnection().request().query(`UPDATE ${title} SET DisableUser='${name}' ,Disabled='1',DisabledDate='${date}'  WHERE SupplierCode = '${code}'`)
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
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE ${column}='${code}' AND Disabled='0'`)
    await disconnect()
    return result;
}

// פונקצית הוספת ספק ע"י פרוצדורה
async function insertSupplier(objectSupplier) {
    await connect();
    const result = await getConnection().request()
        .input('SupplierCode',objectSupplier.SupplierCode)
        .input('SupplierName', objectSupplier.SupplierName)
        .input('licensedDealerNumber', objectSupplier.licensedDealerNumber)
        .input('BokkeepingNumber', objectSupplier.BokkeepingNumber)
        .input('ObjectiveBank', objectSupplier.ObjectiveBank)
        .input('ConditionGushyPayment', objectSupplier.ConditionGushyPayment)
        .input('PreferredPaymentDate', objectSupplier.PreferredPaymentDate)
        .input('Ovligo', objectSupplier.Ovligo)
        .input('Status', objectSupplier.Status)
        .input('Street', objectSupplier.Street)
        .input('HomeNumber', objectSupplier.HomeNumber)
        .input('City', objectSupplier.City)
        .input('ZipCode', objectSupplier.ZipCode)
        .input('Phone1', objectSupplier.Phone1)
        .input('Phone2', objectSupplier.Phone2)
        .input('Mobile', objectSupplier.Mobile)
        .input('Fax', objectSupplier.Fax)
        .input('Mail', objectSupplier.Mail)
        .input('Notes', objectSupplier.Notes)
        .input('CreationDate',objectSupplier.CreationDate||null)
        .input('Disabled',objectSupplier.Disabled||'0')
        .input('DisabledDate',objectSupplier.DisabledDate||null)
        .input('DisableUser',objectSupplier.DisableUser||null)
        .execute(`usp_insertSupplier`);
    await disconnect()
    return result;

}
// פונקצית הוספת סניף ע"י פרוצדורה
async function insertBranch(objectBranch) {
    await connect();
    const result = await getConnection().request()
        .input('SupplierCode',objectBranch.SupplierCode)
        .input('BranchName', objectBranch.BranchName)
        .input('Status', objectBranch.Status)
        .input('Street', objectBranch.Street)
        .input('HomeNumber', objectBranch.HomeNumber)
        .input('City', objectBranch.City)
        .input('ZipCode', objectBranch.ZipCode)
        .input('Phone1', objectBranch.Phone1)
        .input('Phone2', objectBranch.Phone2)
        .input('Mobile', objectBranch.Mobile)
        .input('Fax', objectBranch.Fax)
        .input('Mail', objectBranch.Mail)
        .input('Notes', objectBranch.Notes)
        .input('CreationDate',objectBranch.CreationDate||null)
        .input('UserThatInsert',objectBranch.UserThatInsert||null)
        .input('Disabled',objectBranch.Disabled||'0')
        .input('DisabledDate',objectBranch.DisabledDate||null)
        .input('DisableUser',objectBranch.DisableUser||null)
        .execute(`usp_insertBranch`);
    await disconnect()
    return result;

}


module.exports = {  getByValues, del,getAll,allTheOption, insertSupplier,insertBranch, getIsDisabled, setDate, update }
