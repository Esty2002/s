require('dotenv').config();
const { getAll, allTheOption, insertSupplier, delSupllier, delBranches, insertSupplierAndBranch, update } = require('../../services-suppliers/db/sql-operation');
const { setDate } = require('./functions');
const branchModule = require('./branches');
const { SQL_DB_SUPPLIERS, SQL_DB_BRANCHES } = process.env;

//delet the supplier and update the fields
async function deleteSupplier(object) {
    try {
        const newDate = setDate(new Date());
        const resultSupplierCode = await delSupllier(SQL_DB_SUPPLIERS, SQL_DB_BRANCHES, object.Id, object.DisableUser, newDate)
        return resultSupplierCode
    }
    catch (error) {
        throw new Error('can not delete supplier');
    }

}
//function that get dataSuppliers;
async function getAllSuppliers() {
    try {
        const result = await getAll('suppliers');
        return result.recordset;
    }
    catch (error) {
        throw new Error('can not get all suppliers');
    }
}
//function that get dateSupplier according to search
async function getSupplier(obj) {
    try {
        const result = await allTheOption("Suppliers", obj.option, obj.text);
        return result.recordset;
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
                    const date = setDate(new Date());
                    object.supplier['CreationDate'] = date;
                    object.branch['CreationDate'] = date;
                    const result = await insertSupplierAndBranch(object);
                    return result.recordset;
                }
            }
            else {
                return false;
            }
        }
        else {
            if (await checkValid(object) && await checkUnique(object)) {
                const date = setDate(new Date());
                object['CreationDate'] = date;
                const result = await insertSupplier(object);
                return result.recordset;
            }
            else {
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
    let mustKeys = ["SupplierCode", "SupplierName", "licensedDealerNumber", "Street", "HomeNumber", "City", "Phone1"];
    let array = Object.keys(object);
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && array[(mustKeys[i])] === null)) {
            return false;
        }
    }
    return true;
}

//check if uniques variable is unique
async function checkUnique(object) {
    const resultSupplierCode = await allTheOption('Suppliers', 'SupplierCode', object.SupplierCode);
    const resultSuppliersName = await allTheOption('Suppliers', 'SupplierName', object.SupplierName);
    if (Object.values(object.SupplierCode) !== '' && Object.values(object.SupplierName) !== '') {
        return (resultSupplierCode.recordset.length === 0 && resultSuppliersName.recordset.length === 0);
    }
    if (Object.values(object.SupplierCode) !== '' && Object.values(object.SupplierName) === '') {
        return (resultSupplierCode.recordset.length === 0);
    }
    return (resultSuppliersName.recordset.length === 0);
}
//function to update supplier details
async function updateDetail(code, setting) {
    try {
        let flag = true
        if (setting.SupplierCode === setting.OldSupplierCode && setting.SupplierName === setting.OldSupplierName) {
            flag = false;
        }
        if (flag) {
            if (setting.SupplierCode === setting.OldSupplierCode) {
                if (!await checkUnique({ SupplierCode: '', SupplierName: setting.SupplierName })) {
                    return false;
                }
            }
            else{
                if (setting.SupplierName === setting.OldSupplierName) {
                    if (!await checkUnique({ SupplierCode: setting.SupplierCode, SupplierName: '' })) {
                        return false;
                    }
                }
                else{
                    if (!await checkUnique({ SupplierCode: setting.SupplierCode, SupplierName: setting.SupplierName })) {
                        return false;
                    }
                }
            }
        }
        const result = await update('Suppliers', `SupplierCode='${setting.SupplierCode}',SupplierName='${setting.SupplierName}',licensedDealerNumber='${setting.licensedDealerNumber}',
        BokkeepingNumber='${setting.BokkeepingNumber}',ObjectiveBank= '${setting.ObjectiveBank}',ConditionGushyPayment='${setting.ConditionGushyPayment}',PreferredPaymentDate='${setting.PreferredPaymentDate}',
        Ovligo='${setting.Ovligo}', Status='${setting.Status}' ,Street='${setting.Street}',HomeNumber='${setting.HomeNumber}',City='${setting.City}',ZipCode='${setting.ZipCode}',Phone1='${setting.Phone1}' ,
        Phone2='${setting.Phone2}',Mobile='${setting.Mobile}',Fax='${setting.Fax}',Mail='${setting.Mail}',Notes='${setting.Notes}'`, code, { SupplierName: setting.OldSupplierName })
        return result.recordset;
    }
    catch {
        throw new Error('can not update branch');
    }
}
module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkValid, checkUnique, getSupplier, updateDetail };
