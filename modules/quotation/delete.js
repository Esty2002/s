const { del, update, deleteAll, updateAll } = require('../../services/sql/sql-operations')



//פונקציה למחיקה לפי ליד או הזמנה ולפי אב או בן
async function DeleteQuat(obj) {
    obj.according = 'serialNumber'
    let result = {}
    if (obj.lead) {
        // if (obj.table == 'quotationItems')
        //     result = await del(obj);
        // if (obj.table == 'quotation')
            result = await deleteAll(obj.code);
    }
    if (!obj.lead) {
        obj.all = 'disabled=1'
        // if (obj.table == 'quotationItems')
        //     result = await update(obj);
        // if (obj.table == 'quotation')
            result = await updateAll(obj.code);
    }
    return result

}



module.exports = {DeleteQuat}