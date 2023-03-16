require('dotenv').config();
<<<<<<< HEAD
<<<<<<< HEAD
const { getAll,insertsuppliers,allTheOption, getByValues, del ,setDate} = require('../db/sql-operation');
=======
>>>>>>> 66900a0bd721531d05a65422a9372d37dd21aa65
const {SQL_DB_SUPPLIERS } = process.env;
const { insert,getAll,allTheOption, getByValues, del, insertSupplier,insertBranch,getIsDisabled, setDate, update}=require('../db/sql-operation');

=======
const { getAll,allTheOption, getByValues, delSupllier,delBranches ,setDate} = require('../db/sql-operation');
const {SQL_DB_SUPPLIERS ,SQL_DB_BRANCHES} = process.env;
>>>>>>> SariMorgenshtern

// פונקציה ששולחת לפונקציות מחיקה
async function deletesupplier(object) {
    const date=await setDate()
    const newDate=date.recordset[0].Today
<<<<<<< HEAD
    const resultSupplierCode = await del(SQL_DB_SUPPLIERS, object.SupplierCode, object.DisableUser,newDate)
    return resultSupplierCode

}
=======
    const resultSupplierCode = await delSupllier(SQL_DB_SUPPLIERS, object.SupplierCode, object.DisableUser,newDate)
    const resultBranchCode = await delBranches(SQL_DB_BRANCHES, object.SupplierCode, object.DisableUser,newDate)
    return (resultSupplierCode,resultBranchCode)
}

// async function insertsuppliers(Obj){
//     // const result = await insert(SQL_DB_SUPPLIERS,Object.keys(Obj).join(","),Object.values(Obj).join(","))
//        const result = await insertSupplier(Obj)
//        return result;
// }
>>>>>>> SariMorgenshtern
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
async function insertsuppliers(object) {
    try {
        // await checkValid(object) && 
        if (await checkUnique(object)) {
            const date = await setDate();
            console.log('date');
            object['CreationDate'] = (Object.values(date.recordset[0]))[0];
            console.log(object['CreationDate'][0]);
            console.log('object');
            // const result = await insert("Branches", Object.keys(object).join(','),Object.values(object).join(','))
            const result = await insertSupplier(object)
            console.log('vvvvvvvvvvvvvvvvvvvvvv');
            return result;
        }
        else {
            console.log('xxxxxxxxxxxxxxxxxxxxxx');
            return false;
        }
    }
    catch (error) {
        console.log('error');
        throw error;
    }
}
async function checkValid(object) {
    //לבדוק שהאותיות אותיות והמספרים מספרים
    //לבדוק את מספר הטלפון שהוא תקין
    //לבדוק את תקינות המייל
    let mustKeys = ["SupplierCode", "SupplierName", "licensedDealerNumber", "Status", "Street", "HomeNumber", "City", "Phone1", "CreationDate"]
    let array = Object.keys(object)
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && object[mustKeys[i]] === "")) {
            return false
        }
    }
    return true;
}
//check if uniques variable is unique
async function checkUnique(object) {
    const resultSupplierCode = await getByValues('Suppliers', 'SupplierCode', object.SupplierCode)
    const resultSuppliersName = await getByValues('Suppliers', 'SupplierName', object.SupplierName)
    return (resultSupplierCode.recordset.length === 0 && resultSuppliersName.recordset.length === 0);
}


<<<<<<< HEAD
module.exports = { getallSuppliers ,insertsuppliers,checkValid,checkUnique,getSupplier,deletesupplier}
=======
module.exports = { getallSuppliers  ,getSupplier,deletesupplier}
>>>>>>> SariMorgenshtern
