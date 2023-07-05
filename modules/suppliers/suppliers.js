require('dotenv').config();
// const { setDate } = require('./functions');
const { SQL_DB_SUPPLIERS } = process.env;
const { getData, postData,   } = require('../../services/axios');

async function insertOneSupplier(object) {
    console.log("insrtSupplier - module",{object});
    try {
        if (checkValid(object) && await checkUniqueName(object.SupplierName) && await checkUniqueCode(object.SupplierCode)) {
            console.log("object ", object);
            object.CreationDate = new Date().toISOString().toString();
            console.log("object - new",object.CreationDate)
            let obj = { tableName: 'tbl_Suppliers', values: object };

            console.log({obj})
            const res = await postData(  "/create/create", obj);
            return res.recordset;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
    // /suppliers/getSuppliers/SupplierCode/${code}
}
async function getAllSuppliers(num) {
    console.log("getAllSuppliers - modules" ,num);

    try {
        console.log("getAllSuppliers - modules");
        const res = await getData(  `/read/readAll/${SQL_DB_SUPPLIERS}/Disabled=0`);
        // console.log("data",res);
        return res.data;
    }
    catch (error) {
        console.log("error");
        throw new Error('can not get all suppliers');
    }
}



async function getSupplier(object) {
    try {
        const res = await getData(  `/read/readAll/tbl_Suppliers/${object.option}='${object.text}' AND Disabled=0`);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}

async function updateDetail(code, setting) {
    console.log("updateDeatails - code",code);
    console.log("updtaDetails - settings",setting.LicensedDealerNumber);
    try {
        flag = true
        if (setting.SupplierCode !== setting.OldSupplierCode) {
            if (!await checkUniqueCode(setting.SupplierCode))
                flag = false;
        }
        if (setting.SupplierName !== setting.OldSupplierName) {
            if (!await checkUniqueName(setting.SupplierName))
                flag = false;
        }
        if (!flag) {
            return false;
        }
        let object = {
            tableName: SQL_DB_SUPPLIERS, values: {
                SupplierCode: setting.SupplierCode, SupplierName: setting.SupplierName, LicensedDealerNumber: setting.LicensedDealerNumber, BookkeepingNumber: setting.BookkeepingNumber
                , ObjectiveBank: setting.ObjectiveBank, ConditionGushyPayment: setting.ConditionGushyPayment, PreferredPaymentDate: setting.PreferredPaymentDate,
                Ovligo: setting.Ovligo, Status: setting.Status, Street: setting.Street, HomeNumber: setting.HomeNumber, City: setting.City, ZipCode: setting.ZipCode, Phone1: setting.Phone1,
                Phone2: setting.Phone2, Mobile: setting.Mobile, Fax: setting.Fax, Mail: setting.Mail, Notes: setting.Notes
            }, condition: `SupplierCode='${code}' AND SupplierName='${setting.OldSupplierName}'`
        };
        const result = await postData(  '/update/update', object);
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
        console.log("obj", obj);
        const result = await postData(  '/update/updateSuppliersBranches', obj);
        console.log("result", result);

        return result.data
    }
    catch (error) {
        throw new Error('can not delete supplier');
    }

}
////////////////////////////////////////////////////////////////
function checkValid(object) {
    let mustKeys = ["SupplierCode", "SupplierName", "LicensedDealerNumber", "Street", "HomeNumber", "City", "Phone1"];
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
    console.log("check - unique - code", code);
    let resultSupplierCode = await getData(  `/read/readAll/${SQL_DB_SUPPLIERS}/SupplierCode='${code}' AND  Disabled='0'`);
   
    return resultSupplierCode.data.length===0

}
async function checkUniqueName(name) {
    console.log("check - unique - name", name);
    let resultSuppliersName = await getData(  `/read/readAll/${SQL_DB_SUPPLIERS}/SupplierName='${name}' AND  Disabled='0'`);
 
    return resultSuppliersName.data.length===0
}

async function checkUnique(setting) {
    let resultSuppliersCode = checkUniqueCode(setting.SupplierCode);
    let resultSuppliersName = checkUniqueName(setting.SupplierName);
    // console.log(resultSuppliersCode && resultSuppliersName);
    return resultSuppliersCode && resultSuppliersName;
}

async function countRowes(code, isDisable) {
    console.log("countRowes - module");
    let countRowesBranches = await postData( `read/countRows`, { tableName: SQL_DB_BRANCHES, condition: ` SupplierCode =${code} and Disabled = ${isDisable}` })
    // console.log("countRowesBranches:", countRowesBranches.data.recordset);
    return countRowesBranches.data.recordset;
}
module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkValid, checkUnique, getSupplier, updateDetail, checkUniqueCode, checkUniqueName, countRowes };