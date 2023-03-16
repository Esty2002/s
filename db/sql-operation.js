const { connect, disconnect, getConnection } = require('./sql-connection')
//פונקציה שמחזירה את כל הנתונים מטבלה מסוימת
async function getAll(table) {
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE Disabled='0'`)
<<<<<<< HEAD
=======
    await disconnect()
    return result;
}
// SQL פונקציה  שמכניסה נתונים ל
async function insert(table, columns, values) {
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${table}(${columns}) VALUES (${values})`)
>>>>>>> SariMorgenshtern
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
// פונקצית מחיקת ספק  
async function delSupllier(title, code, name, date) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET DisableUser='${name}' ,Disabled='1',DisabledDate='${date}'  WHERE SupplierCode = '${code}'`)
    await disconnect()
    return result;
}
// פונקצית מחיקת סניף  
async function delBranches(title, code, name, date) {
    console.log('title',title);
    console.log('code',code);
    console.log('name',name);
    console.log('date',date);

    await connect()
    const result = await getConnection().request().query(`UPDATE ${title} SET DisableUser='${name}' ,Disabled='1',DisabledDate='${date}'  WHERE SupplierCode= '${code}'`)
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
    console.log(`SELECT * FROM ${table} WHERE ${column}='${code}' AND Disabled='0'`);
    await connect()
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE ${column}='${code}' AND Disabled='0'`)
<<<<<<< HEAD
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
        .input('CreationDate',objectSupplier.CreationDate||'NULL')
        .input('Disabled',objectSupplier.Disabled||'0')
        .input('DisabledDate',objectSupplier.DisabledDate||'NULL')
        .input('DisableUser',objectSupplier.DisableUser||'NULL')
        .execute(`usp_insertSupplier`);
=======
>>>>>>> SariMorgenshtern
    await disconnect()
    return result;

}
<<<<<<< HEAD
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
        .input('CreationDate',objectBranch.CreationDate||'NULL')
        .input('UserThatInsert',objectBranch.UserThatInsert||'NULL')
        .input('Disabled',objectBranch.Disabled||'0')
        .input('DisabledDate',objectBranch.DisabledDate||'NULL')
        .input('DisableUser',objectBranch.DisableUser||'NULL')
        .execute(`usp_insertBranch`);
    await disconnect()
    return result;

}
<<<<<<< HEAD
async function insertSupplier(objectSupplier) {
    // await connect();
    // console.log("..................");
    // console.log(objectSupplier);
    // console.log("..................");
    // const result = await getConnection().request()
    //     .input('SupplierCode', req.query.SupplierCode )
    //     // .input('size', req.query.size ||NULL)
    //     // .input('search', req.query.search || '')
    //     // .input('orderBy', req.query.orderBy || 'Id')
    //     // .input('orderDir', req.query.orderDir || 'DESC')

<<<<<<< HEAD
    //     .execute(`usp_insertSupplier`);
    // await disconnect()
    // return result;

}

module.exports = {insertsuppliers, getAll, insert, getByValues, del, getIsDisabled, setDate, update }
=======
module.exports = {allTheOption, getAll, insert, getByValues, del, getIsDisabled, setDate,update }
>>>>>>> c844b7c94ce7ca7fdc230a8efcca182059c05b17
=======

>>>>>>> 66900a0bd721531d05a65422a9372d37dd21aa65
=======
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

module.exports = {allTheOption, getAll, insert, getByValues, delSupllier, getIsDisabled, setDate,update,delBranches }
>>>>>>> SariMorgenshtern

module.exports = {  getByValues, del,getAll,allTheOption, insertSupplier,insertBranch, getIsDisabled, setDate, update }
