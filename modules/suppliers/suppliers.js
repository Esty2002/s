require('dotenv').config();
var sql = require('mssql');
const { setDate } = require('./functions');
const { SQL_DB_SUPPLIERS, SQL_DB_BRANCHES } = process.env;
const { getData, postData, sqlServer } = require('../../services/axios');

async function deleteSupplier(object) {

    //רחלי היקרה תעשי פונקציה מיוחדת לטרנזקציה  
    try {
        // const newDate = setDate(new Date());
        // const resultSupplierCode = await delSupllier(SQL_DB_SUPPLIERS, SQL_DB_BRANCHES, object.SupplierCode, object.DisableUser, newDate,object.Id)
        // return resultSupplierCode
    }
    catch (error) {
        throw new Error('can not delete supplier');
    }

}

async function getAllSuppliers() {
    try {
        let obj = { tableName: SQL_DB_SUPPLIERS, columns: "*", condition: "Disabled=0" };
        const res = await postData(sqlServer, "/read/readTop20", obj);
        return res.data;
    }
    catch (error) {
        throw new Error('can not get all suppliers');
    }
}

async function getSupplier(object) {
    try {
        let obj = { tableName: SQL_DB_SUPPLIERS, columns: "*", condition: `${object.option}='${object.text}' AND  Disabled=0` };
        const res = await postData(sqlServer, "/read/readTop20", obj);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}

async function insertOneSupplier(object) {
    try {
        if (checkValid(object) && await checkUnique(object)) {
            const date = setDate(new Date());
            object['CreationDate'] = date;
            let obj = { tableName: SQL_DB_SUPPLIERS, values: object, condition: "1=1" };
            const res = await postData(sqlServer, "/create/create", obj);
            console.log(res, "insert supplier");
            return res.recordset;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
}

function checkValid(object) {
    let mustKeys = ["SupplierCode", "SupplierName", "licensedDealerNumber", "Street", "HomeNumber", "City", "Phone1"];
    let array = Object.keys(object);
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && array[(mustKeys[i])] === null)) {
            return false;
        }
    }
    return true;
}

async function checkUnique(object) {
    let obj = { tableName: SQL_DB_SUPPLIERS, columns: "*", condition: `SupplierCode='${object.SupplierCode}' AND  Disabled=0` };
    let obj2 = { tableName: SQL_DB_SUPPLIERS, columns: "*", condition: `SupplierName='${object.SupplierName}' AND  Disabled=0` };
    let resultSupplierCode = await postData(sqlServer, "/read/readTop20", obj);
    let resultSuppliersName = await postData(sqlServer, "/read/readTop20", obj2);
    resultSupplierCode = resultSupplierCode.data;
    resultSuppliersName = resultSuppliersName.data;
    if (Object.values(object.SupplierCode) !== '' && Object.values(object.SupplierName) !== '') {
        return (resultSupplierCode.length === 0 && resultSuppliersName.length === 0);
    }
    if (Object.values(object.SupplierCode) !== '' && Object.values(object.SupplierName) === '') {
        return (resultSupplierCode.length === 0);
    }
    return (resultSuppliersName.length === 0);
}

async function updateDetail(code, setting) {
    try {
        let flag = true;
        if (setting.SupplierCode === setting.OldSupplierCode && setting.SupplierName === setting.OldSuppliername) {
            flag = false;
        }
        if (flag) {
            if (setting.SupplierCode === setting.OldSupplierCode) {
                if (!await checkUnique({ SupplierCode: '', SupplierName: setting.SupplierName })) {
                    return false;
                }
            }
            else {
                if (setting.SupplierName === setting.OldSupplierName) {
                    if (!await checkUnique({ SupplierCode: setting.SupplierCode, SupplierName: '' })) {
                        return false;
                    }
                }
                else {
                    if (!await checkUnique({ SupplierCode: setting.SupplierCode, SupplierName: setting.SupplierName })) {
                        return false;
                    }
                }
            }
        }
        let object = {
            tableName: SQL_DB_SUPPLIERS, values: {
                SupplierCode: setting.SupplierCode, SupplierName: setting.SupplierName, licensedDealerNumber: setting.licensedDealerNumber, BokkeepingNumber: setting.BokkeepingNumber
                , ObjectiveBank: setting.ObjectiveBank, ConditionGushyPayment: setting.ConditionGushyPayment, PreferredPaymentDate: setting.PreferredPaymentDate,
                Ovligo: setting.Ovligo, Status: setting.Status, Street: setting.Street, HomeNumber: setting.HomeNumber, City: setting.City, ZipCode: setting.ZipCode, Phone1: setting.Phone1,
                Phone2: setting.Phone2, Mobile: setting.Mobile, Fax: setting.Fax, Mail: setting.Mail, Notes: setting.Notes
            }, condition: `SupplierCode='${code}' AND SupplierName='${setting.OldSupplierName}'`
        };
        const result = await postData(sqlServer, '/update/update', object);
        return result.recordset;
    }
    catch {
        throw new Error('can not update branch');
    }
}
module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkValid, checkUnique, getSupplier, updateDetail };
