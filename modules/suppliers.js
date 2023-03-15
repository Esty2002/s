require('dotenv').config();
const { getAll,insertsuppliers,allTheOption, getByValues, del ,setDate} = require('../db/sql-operation');
const {SQL_DB_SUPPLIERS } = process.env;

// פונקציה ששולחת לפונקציות מחיקה
async function deletesupplier(object) {
    const date=await setDate()
    const newDate=date.recordset[0].Today
    console.log(newDate);
    console.log(Object.values(object)[0]);
    //////////////////////////לקבל משתנה גלובלי
    const resultSupplierCode = await del(SQL_DB_SUPPLIERS, '11', Object.values(object)[0],newDate)
    return resultSupplierCode

}
async function insertsuppliers(Obj){
    console.log(Object.keys(Obj).join(",")+"Object.keys(Obj).join(",")");
    console.log(Object.values(Obj)+"Object.values(Obj)");
    // const result = await insert(SQL_DB_SUPPLIERS,Object.keys(Obj).join(","),Object.values(Obj).join(","))
       const result = await insertSupplier(Obj)

    
    return result;
}

async function getallSuppliers() {
    const result = await getAll('suppliers')
    return result;
}

async function getSupplier(obj) {
    console.log("obj.option");
    console.log(obj.text);
    console.log("obj.option");
    const result = await allTheOption("Suppliers",obj.option,obj.text)
    console.log(result,'getSupplierrrrrrrrrrrrrrrrrr');
    return result;
}

module.exports = { getallSuppliers ,insertsuppliers,getSupplier,deletesupplier}
