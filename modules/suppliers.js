require('dotenv').config();
const { SQL_DB_SUPPLIERS } = process.env;
const { insert, getAll, allTheOption, getByValues, del, insertSupplier, insertBranch, getIsDisabled, setDate, update,insertSupplierAndBranch } = require('../db/sql-operation');
const branchModule = require('./branches');

// פונקציה ששולחת לפונקציות מחיקה
async function deletesupplier(object) {
    const date = await setDate()
    const newDate = date.recordset[0].Today
    const resultSupplierCode = await del(SQL_DB_SUPPLIERS, object.SupplierCode, object.DisableUser, newDate)
    return resultSupplierCode

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
    const result = await allTheOption("Suppliers", obj.option, obj.text)
    return result;
}
async function insertsuppliers(object) {
    try {
        if (Object.keys(object).length===2) {
            if (await checkValid(object.supplier) && await checkUnique(object.supplier)) {
                if ( await branchModule.checkValid(object.branch) && await branchModule.checkUnique(object.branch)) {
                    const date = await setDate();
                    object.supplier['CreationDate'] = (Object.values(date.recordset[0]))[0];
                    object.branch['CreationDate'] = (Object.values(date.recordset[0]))[0];
                    console.log('in check  insertSupplierAndBranch');
                    const result=await insertSupplierAndBranch(object)
                    return result
                }
                else{
              
                }
            }
            else {
                console.log('noooooooooooooo');
            }
        }
        else {
            if (await checkValid(object) && await checkUnique(object)) {
                const date = await setDate();
                object['CreationDate'] = (Object.values(date.recordset[0]))[0];
                const result = await insertSupplier(object)
                console.log('vvvvvvvvvvvvvvvvvvvvvv');
                return result;
            }
            else {
                console.log('xxxxxxxxxxxxxxxxxxxxxx');
                return false;
            }
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
    let mustKeys = ["SupplierCode", "SupplierName", "licensedDealerNumber", "Street", "HomeNumber", "City", "Phone1"]
    let array = Object.keys(object)
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && array[(mustKeys[i])] === null)) {
            return false;
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




module.exports = { getallSuppliers, insertsuppliers, checkValid, checkUnique, getSupplier, deletesupplier }
