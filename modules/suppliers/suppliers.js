require('dotenv').config();
// const { setDate } = require('./functions');
const { SQL_DB_SUPPLIERS, SQL_DB_BRANCHES } = process.env;
const { getData, postData } = require('../../services/axios');

async function insertOneSupplier(object) {
    console.log("insrtSupplier - module",{object});
    try {
         if (checkValid(object) && await checkUniqueName(object.SupplierName) && await checkUniqueCode(object.SupplierCode)) {
            object.CreationDate = new Date().toISOString();
            let obj = { tableName: 'tbl_Suppliers', values: object };

            const res = await postData( "/create/create", obj);
            return res;
        }
         else {
            throw new Error('validation')
         }
    }
    catch (error) {
        console.log({error})
        throw error;
    }
    // /suppliers/getSuppliers/SupplierCode/${code}
}
async function getAllSuppliers(num) {
    console.log("getAllSuppliers - modules" ,num);

    try {
        const res = await getData( `/read/readAll/${SQL_DB_SUPPLIERS}/Disabled=${num}`);
        console.log({res:res.data})
        for (let item of res.data) {
            const res = await countRows(item.Id,num);
            if (res) {
                console.log(item)
                item.countBraches = res[0].countRows;
            }
        }
        return res.data;
    }
    catch (error) {
        console.log("error");
        throw new Error('can not get all suppliers');
    }
}



async function getSupplier(object) {
    try {
        const res = await getData( `/read/readAll/tbl_Suppliers/${object.option}='${object.text}' AND Disabled=0`);
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
        const result = await postData( '/update/update', object);
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
        // console.log("obj", obj);
        const result = await postData( '/update/updateSuppliersBranches', obj);
        // console.log("result", result);

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
    let resultSupplierCode = await getData( `/read/readAll/${SQL_DB_SUPPLIERS}/SupplierCode='${code}' AND  Disabled='0'`);
<<<<<<< HEAD
   
    return resultSupplierCode.length===0
=======
    console.log(resultSupplierCode)
    return resultSupplierCode.data.length === 0
>>>>>>> 0acb9685a52e32e53d0378b70fecf84264888e53

}
async function checkUniqueName(name) {
    let resultSuppliersName = await getData( `/read/readAll/${SQL_DB_SUPPLIERS}/SupplierName='${name}' AND  Disabled='0'`);
<<<<<<< HEAD
 
    return resultSuppliersName.length===0
=======
    console.log(resultSuppliersName)
    return resultSuppliersName.data.length === 0
>>>>>>> 0acb9685a52e32e53d0378b70fecf84264888e53
}

async function checkUnique(setting) {
    let resultSuppliersCode = checkUniqueCode(setting.SupplierCode);
    let resultSuppliersName = checkUniqueName(setting.SupplierName);
    // console.log(resultSuppliersCode && resultSuppliersName);
    return resultSuppliersCode && resultSuppliersName;
}

async function countRows(code, isDisable) {
    console.log("countRowes - module");
    const countRowesBranches = await postData( `read/countRows`, { tableName: SQL_DB_BRANCHES, condition: ` SupplierCode =${code} and Disabled = ${isDisable}` })
    // console.log("countRowesBranches:", countRowesBranches.data.recordset);
    console.log(countRowesBranches.data)
    return countRowesBranches.data.recordset;
}
module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkValid, checkUnique, getSupplier, updateDetail, checkUniqueCode, checkUniqueName, countRows };