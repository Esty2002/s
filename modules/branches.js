const {  getAll, insert, getByValues, del ,changeDisabele,setDate,changeDisabledDate } = require('../db/sql-operation');

async function getallbranches() {
    const result = await getAll('Branches')
    return result;
}

async function insertbranch(table,columns, values) {
    const result = await insert(table,columns, values)
    return result;
}
async function deletebranches(object) {
    const date=await setDate()
    const newDate=date.recordset[0].Today
    console.log(newDate);
    //////////////////////////להוסיף משתנה גלובלי
    const resultSupplierCode = await del(SQL_DB_SUPPLIERS, '453', Object.values(object)[0])
    const resultSupplierCode2 = await changeDisabele(SQL_DB_SUPPLIERS, '453')
    const resultSupplierCode3 = await changeDisabledDate(SQL_DB_SUPPLIERS, '453', newDate)
    return resultSupplierCode

}


module.exports = { getallbranches ,insertbranch,deletebranches}