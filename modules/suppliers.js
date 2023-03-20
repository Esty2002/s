require('dotenv').config();
const { getAll, allTheOption, insertSupplier, update, delSupllier, delBranches, insertSupplierAndBranch } = require('../db/sql-operation');
const { setDate } = require('../services/functions');

const branchModule = require('./branches');

const { SQL_DB_SUPPLIERS, SQL_DB_BRANCHES } = process.env;

//delet the supplier and update the fields
async function deleteSupplier(object) {
    try {
        const newDate = await setDate(new Date());
        const resultSupplierCode = await delSupllier(SQL_DB_SUPPLIERS, SQL_DB_BRANCHES, object.SupplierCode, object.DisableUser, newDate)
        return (resultSupplierCode)
    }
    catch (error) {
        console.log('error');
        throw new Error('can not delete supplier');
    }

}
//פונקציה שמקבלת נתוני כל הספקים
async function getAllSuppliers() {
    try {
        const result = await getAll('suppliers');
        return result;
    }
    catch (error) {
        throw error;
    }
}
//פונקציה שמקבלת נתוני ספק לפי החיפוש ששולחים לו
async function getSupplier(obj) {
    try {
        const result = await allTheOption("Suppliers", obj.option, obj.text)
        return result;
    }
    catch (error) {
        throw error;
    }
}
async function insertOneSupplier(object) {
    try {
        if (Object.keys(object).length === 2) {
            if (await checkValid(object.supplier) && await checkUnique(object.supplier)) {
                if (await branchModule.checkValid(object.branch) && await branchModule.checkUnique(object.branch)) {
                    const date = await setDate(new Date());
                    object.supplier['CreationDate'] = date;
                    object.branch['CreationDate'] = date;
                    console.log('in check  insertSupplierAndBranch');
                    const result = await insertSupplierAndBranch(object)
                    return result
                }
                else {

                }
            }
            else {
                console.log('noooooooooooooo');
            }
        }
        else {
            if (await checkValid(object) && await checkUnique(object)) {
                const date = await setDate(new Date());
                object['CreationDate'] = date;
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
    const resultSupplierCode = await allTheOption('Suppliers', 'SupplierCode', object.SupplierCode)
    const resultSuppliersName = await allTheOption('Suppliers', 'SupplierName', object.SupplierName)
    return (resultSupplierCode.recordset.length === 0 && resultSuppliersName.recordset.length === 0);
}


module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkValid, checkUnique, getSupplier };
