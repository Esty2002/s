require('dotenv').config();
// const { setDate } = require('./functions');
const { SQL_DB_SUPPLIERS, SQL_DB_BRANCHES } = process.env;
const { getData, postData } = require('../../services/axios');

async function insertOneSupplier(object) {
<<<<<<< HEAD
    console.log("insrtSupplier - module", { object });
    try {
        if (checkValid(object) && await checkUniqueName(object.SupplierName) && await checkUniqueCode(object.SupplierCode)) {
            object.CreationDate = new Date().toISOString();
            let obj = { tableName: 'tbl_Suppliers', values: object };

            const res = await postData("/create/create", obj);
            return res;
=======
    try {
        if (checkValid(object) && await checkUniqueName(object.SupplierName) && await checkUniqueCode(object.SupplierCode)) {
            object.CreationDate = new Date().toISOString().toString();
            let obj = { tableName: 'tbl_Suppliers', values: object };
            const res = await postData("/create/create", obj);
            return res.data;
>>>>>>> logger
        }
        else {
            throw new Error('validation')
        }
    }
    catch (error) {
        console.log({ error })
        throw error;
    }
}
<<<<<<< HEAD
async function getAllSuppliers(query) {
    console.log({ query })
    try {
        const res = await getData(`/read/readAllEntity/Suppliers`, query);
        for (let item of res.data) {
            const res = await countRows({ SupplierCode: item.Id, ...query });
            console.log({ res })
=======
async function getAllSuppliers(num) {
    try {
        const res = await getData(`/read/readAll/${SQL_DB_SUPPLIERS}/Disabled=${num}`);
        for (let item of res.data) {
            const res = await countRowes(item.Id, num);
>>>>>>> logger
            if (res) {
                console.log(item)
                item.countBranches = res.countRows;
            }
            else {
                item.countBranches = 0
            }
        }
        return res;
    }
    catch (error) {
        console.log(error.message);
        throw error
    }
}



async function getSupplier(query) {
    try {
<<<<<<< HEAD
        const res = await getData(`/read/readAllEntity/Suppliers`, query);
        return res;
=======
        const res = await getData(`/read/readAll/tbl_Suppliers/${object.option}='${object.text}' AND Disabled=0`);
        return res.data;
>>>>>>> logger
    }
    catch (error) {
        throw error;
    }
}

<<<<<<< HEAD
async function updateDetail( setting) {
=======
async function updateDetail(code, setting) {
>>>>>>> logger
    try {
        flag = true
        console.log()
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
            }, condition: { Id: setting.Id }
        };
<<<<<<< HEAD
        console.log({object})
=======
>>>>>>> logger
        const result = await postData('/update/update', object);
        return result;
    }
    catch (error) {
        console.log(error.message)
        throw new Error('can not update branch');
    }
}
//////////////////////////////////////////////////////////////
async function deleteSupplier(object) {
    try {
<<<<<<< HEAD
        let obj = { tableName: 'tbl_Suppliers', values: { DisableUser: object.DisableUser, DisabledDate: new Date().toISOString(), Disabled: true }, condition: { Id: object.Id } }
        // console.log("obj", obj);
        const result = await postData('/update/updateOne', obj);
        if (result.status === 200) {
            obj = {
                tableName: 'tbl_Branches',
                values: { DisableUser: object.DisableUser, DisabledDate: new Date().toISOString(), Disabled: true },
                condition: { SupplierCode: object.Id }
            }
            const branchResult = await postData('/update/updateOne', obj);
            return result
        }
        else {
            return result
        }
        // console.log("result", result);


=======
        let obj = { supplierCode: object.SupplierCode, name: object.DisableUser, id: object.Id }
        const result = await postData('/update/updateSuppliersBranches', obj);
        return result.data
>>>>>>> logger
    }
    catch (error) {
        console.log(error.message)
        throw error
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
    let resultSupplierCode = await getData(`/read/readAll/${SQL_DB_SUPPLIERS}/SupplierCode='${code}' AND  Disabled='0'`);
<<<<<<< HEAD
    if (resultSupplierCode.status === 200)
        return resultSupplierCode.data.length === 0
    else {
        return false
    }
=======
    console.log("resultSupplierCode", resultSupplierCode);
    return resultSupplierCode.data.length === 0
>>>>>>> logger

}
async function checkUniqueName(name) {
    let resultSuppliersName = await getData(`/read/readAll/${SQL_DB_SUPPLIERS}/SupplierName='${name}' AND  Disabled='0'`);
<<<<<<< HEAD
    if (resultSuppliersName.status === 200)
        return resultSuppliersName.data.length === 0
    else {
        return false
    }
=======
    console.log("resultSuppliersName", resultSuppliersName);
    return resultSuppliersName.data.length === 0
>>>>>>> logger
}

async function checkUnique(setting) {
    let resultSuppliersCode = checkUniqueCode(setting.SupplierCode);
    let resultSuppliersName = checkUniqueName(setting.SupplierName);
    return resultSuppliersCode && resultSuppliersName;
}

<<<<<<< HEAD
async function countRows(condition) {
    const countRowesBranches = await postData(`read/countRows`, { tableName: SQL_DB_BRANCHES, condition })
    // console.log("countRowesBranches:", countRowesBranches.data.recordset);
    console.log({ rows: countRowesBranches.data })
    return countRowesBranches.data;
=======
async function countRowes(code, isDisable) {
    console.log("countRowes - module");
    let countRowesBranches = await postData(`read/countRows`, { tableName: SQL_DB_BRANCHES, condition: ` SupplierCode =${code} and Disabled = ${isDisable}` })
    return countRowesBranches.data.recordset;
>>>>>>> logger
}
module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkValid, checkUnique, getSupplier, updateDetail, checkUniqueCode, checkUniqueName, countRows };