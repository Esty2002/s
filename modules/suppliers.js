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



module.exports = { deletesupplier }
