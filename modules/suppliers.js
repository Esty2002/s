require('dotenv').config();
const { getAll, insert, getByValues, del ,changeDisabele,setDate,changeDisabledDate} = require('../db/sql-operation');
const {SQL_DB_SUPPLIERS } = process.env;

// פונקציה ששולחת לפונקציות מחיקה
async function deletesupplier(object) {
    const date=await setDate()
    const newDate=date.recordset[0].Today
    console.log(newDate);
    //////////////////////////להוסיף משתנה גלובלי
    const resultSupplierCode = await del(SQL_DB_SUPPLIERS, '36', Object.values(object)[0])
    const resultSupplierCode2 = await changeDisabele(SQL_DB_SUPPLIERS, '36')
    const resultSupplierCode3 = await changeDisabledDate(SQL_DB_SUPPLIERS, '36', newDate)
    return resultSupplierCode

}

async function getallsuppliers(){
    const result = await getAll('Suppliers')
    return result;
}

async function insertsuppliers(Obj){
    console.log("-----------",Obj);
    console.log(Object.keys(Obj).join(",")+"Object.keys(Obj).join(",")");
    console.log(Object.values(Obj)+"Object.values(Obj)");
    const result = await insert(SQL_DB_SUPPLIERS,Object.keys(Obj).join(","),Object.values(Obj).join(","))
    return result;
}

module.exports={getallsuppliers,insertsuppliers,deletesupplier}
