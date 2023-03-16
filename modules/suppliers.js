require('dotenv').config();
const { getAll,allTheOption, getByValues, delSupllier,delBranches ,setDate} = require('../db/sql-operation');
const {SQL_DB_SUPPLIERS ,SQL_DB_BRANCHES} = process.env;

// פונקציה ששולחת לפונקציות מחיקה
async function deletesupplier(object) {
    const date=await setDate()
    const newDate=date.recordset[0].Today
    const resultSupplierCode = await delSupllier(SQL_DB_SUPPLIERS, object.SupplierCode, object.DisableUser,newDate)
    const resultBranchCode = await delBranches(SQL_DB_BRANCHES, object.SupplierCode, object.DisableUser,newDate)
    return (resultSupplierCode,resultBranchCode)
}

// async function insertsuppliers(Obj){
//     // const result = await insert(SQL_DB_SUPPLIERS,Object.keys(Obj).join(","),Object.values(Obj).join(","))
//        const result = await insertSupplier(Obj)
//        return result;
// }
//פונקציה שמקבלת נתוני כל הספקים
async function getallSuppliers() {
    const result = await getAll('suppliers')
    return result;
}
//פונקציה שמקבלת נתוני ספק לפי החיפוש ששולחים לו
async function getSupplier(obj) {
    const result = await allTheOption("Suppliers",obj.option,obj.text)
    return result;
}

module.exports = { getallSuppliers  ,getSupplier,deletesupplier}
