const { deleteAll, updateAll } = require('../../services/sql/sql-operations')




//פונקציה למחיקה לפי ליד או הזמנה ולפי אב או בן
async function DeleteQuat(obj) {
    obj.according = 'serialNumber'
    let result = {}
    try {
        if (obj.lead) {
            result = await deleteAll(obj.code);
        }
        if (!obj.lead) {
            obj.all = 'disabled=1'
            result = await updateAll(obj.code);
        }

        return result
    }
    catch (error) {
        console.log('not exist');
        throw new Error('this table does not exist')
    }

}



module.exports = { DeleteQuat }
