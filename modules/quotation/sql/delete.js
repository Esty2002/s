const { createQuatationItamsTable, createQuatationTable, del, update, deleteAll, updateAll } = require('../../../services/sql/sql-operations')

async function Start1() {
    const result = await createQuatationTable();
    return result
}

async function Start2() {
    const result = await createQuatationItamsTable();
    return result
}


//פונקציה למחיקה לפי ליד או הזמנה ולפי אב או בן
async function Delete(obj) {
    obj.according = 'serialNumber'
    let result = {}
    if (obj.lead) {
        if (obj.table == 'quotationItems')
            result = await del(obj);
        if (obj.table == 'quotation')
            result = await deleteAll(obj.code);
    }
    if (!obj.lead) {
        obj.all = 'disabled=1'
        if (obj.table == 'quotationItems')
            result = await update(obj);
        if (obj.table == 'quotation')
            result = await updateAll(obj.code);
    }

    return result

}



module.exports = { Start1, Start2, Delete }