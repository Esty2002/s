require('dotenv').config();
const { getAll,insertsuppliers,allTheOption, getByValues, del ,setDate} = require('../db/sql-operation');
const {SQL_DB_SUPPLIERS } = process.env;

// פונקציה ששולחת לפונקציות מחיקה
async function deletesupplier(object) {
    const date=await setDate()
    const newDate=date.recordset[0].Today
    const resultSupplierCode = await del(SQL_DB_SUPPLIERS, object.SupplierCode, object.DisableUser,newDate)
    return resultSupplierCode

}
async function insertsuppliers(Obj){
    // const result = await insert(SQL_DB_SUPPLIERS,Object.keys(Obj).join(","),Object.values(Obj).join(","))
       const result = await insertSupplier(Obj)
       return result;
}
//פונקציה שמקבלת נתוני כל הספקים
async function getallSuppliers() {
    const result = await getAll('suppliers')
    return result;
}
//פונקציה שמקבלת נתוני ספק לפי החיפוש ששולחים לו
async function getSupplier(obj) {
    console.log("obj.option");
    console.log(obj.text);
    console.log("obj.option");
    const result = await allTheOption("Suppliers",obj.option,obj.text)
    return result;
}

module.exports = { getallSuppliers ,insertsuppliers,getSupplier,deletesupplier}
