require('dotenv').config();
// const { setDate } = require('./functions');
// const { SQL_DB_SUPPLIERS } = process.env;
const { getData, postData, sqlServer } = require('../../services/axios');

async function insertOneSupplier(object) {
    try {
        if (checkValid(object) && await checkUniqueName(object.SupplierName) && await checkUniqueCode(object.SupplierCode)) {
            console.log("object ",object);
            object.CreationDate =new Date().toISOString().toString();
            console.log(object.CreationDate)
            let obj = { tableName: 'tbl_Suppliers', values: object };

            console.log({obj})
            const res = await postData(sqlServer, "/create/create", obj);
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
async function getAllSuppliers() {
    try {
        const res = await getData(sqlServer, `/read/readAll/tbl_Suppliers/Disabled=0`);
        return res.data;
    }
    catch (error) {
        throw new Error('can not get all suppliers');
    }
}

async function getSupplier(object) {
    try {
        const res = await getData(sqlServer, `/read/readAll/tbl_Suppliers/${object.option}='${object.text}' AND Disabled=0`);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}

async function updateDetail(code, setting) {
    try {
        if (!await checkUnique(setting)){
            return false;
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
//////////////////////////////////////////////////////////////
async function deleteSupplier(object) {
    try {
        let obj = { supplierCode: object.SupplierCode, name: object.DisableUser, id: object.Id }
        const result = await postData(sqlServer, '/update/updateSuppliersBranches', obj);
        return result.data
    }
    catch (error) {
        throw new Error('can not delete supplier');
    }

}
////////////////////////////////////////////////////////////////
function checkValid(object) {
    let mustKeys = ["SupplierCode", "SupplierName", "licensedDealerNumber", "Street", "HomeNumber", "City", "Phone1"];
    let array = Object.keys(object);
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && array[(mustKeys[i])] === null)) {
            console.log('false');
            return false;
        }
    }
    return true;
}
////////////////////////////////////////////////////////////////
async function checkUniqueCode(code) {
    let resultSupplierCode = await getData(sqlServer, `/read/readAll/tbl_Suppliers/SupplierCode='${code}' AND  Disabled='0'`);
    return resultSupplierCode.data[0]===undefined
 
}
async function checkUniqueName(name) {
    let resultSuppliersName = await getData(sqlServer, `/read/readAll/tbl_Suppliers/SupplierName='${name}' AND  Disabled='0'`);
    return resultSuppliersName.data[0]===undefined
}

async function checkUnique(setting) {
    if(setting.SupplierCode !== setting.OldSupplierCode){
        if(!await checkUniqueCode(setting.SupplierCode))
        return false;
    }
    if(setting.SupplierName !== setting.OldSupplierName){
        if(!await checkUniqueName(setting.SupplierName))
        return false;
    }
    return true;
}
module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkValid ,checkUnique, getSupplier, updateDetail };