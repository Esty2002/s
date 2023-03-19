const { connect, disconnect, getConnection } = require('./sql-connection')

//פונקציה שמחזירה את כל הנתונים מטבלה מסוימת
async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE Disabled='0'`)
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


// Begin tran
// UPDATE Suppliers 
// SET DisableUser='sss' ,Disabled='1',DisabledDate='02/05/85'  
// WHERE SupplierCode = '22'
// UPDATE Branches 
// SET DisableUser='sss' ,Disabled='1',DisabledDate='02/05/85'  
// WHERE SupplierCode = '22'
// commit


// פונקצית מחיקת ספק  
async function delSupllier(titleSup, titelBran, code, name, date) {
    await connect()
    // const result = await getConnection().request().query(`BEGIN TRAN UPDATE ${titleSup} SET DisableUser='${name}' ,Disabled='1',DisabledDate='${date}'  WHERE SupplierCode = '${code} 
    // UPDATE ${titelBran} SET DisableUser='${name}' ,Disabled='1',DisabledDate='${date}'  WHERE SupplierCode = '${code}'  commit rollback`)
    const result = await getConnection().request().query(`UPDATE ${titleSup} SET DisableUser='${name}' ,Disabled='1',DisabledDate='${date}'  WHERE SupplierCode = '${code} `)
    const result1 = await getConnection().request().query(`UPDATE ${titelBran} SET DisableUser='${name}' ,Disabled='1',DisabledDate='${date}'  WHERE SupplierCode = '${code} `)

    await disconnect()
    return result,result1;
}
// פונקצית מחיקת סניף  
async function delBranches(title, code, name, date) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET DisableUser='${name}' ,Disabled='1',DisabledDate='${date}'  WHERE SupplierCode= '${code}'`)
    await disconnect()
    return result;
}
//פונקצית עדכון
async function update(title, setting, code) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET ${setting} WHERE SupplierCode = '${code}'`)
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
//פונקציה שבודקת עבור סניף האם הוא יחודי לספק שלו
async function checkUniqueBranch(code, branchname) {
    await connect()
    const result = await getConnection().request().query(`
    SELECT * FROM (SELECT * FROM Branches WHERE SupplierCode='${code}' AND Disabled='0' )ss WHERE ss.BranchName ='${branchname}'`)
    await disconnect()
    return result;
}
// פונקצית הוספת ספק ע"י פרוצדורה
async function insertSupplier(objectSupplier) {
    await connect();
    const result = await getConnection().request()
        .input('SupplierCode', objectSupplier.SupplierCode)
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
        .input('SupplierCode', objectBranch.SupplierCode)
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

module.exports = { allTheOption, getAll, insertSupplier, delSupllier, setDate, update, delBranches, insertBranch, checkUniqueBranch }


