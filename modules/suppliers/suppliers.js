require('dotenv').config();
// const { setDate } = require('./functions');
const { SQL_DB_SUPPLIERS, SQL_DB_BRANCHES } = process.env;
const { getData, postData, putData, deleteData } = require('../../services/axios');

async function insertOneSupplier(object) {
    try {
        if (checkValid(object) && await checkUniqueName(object.SupplierName) && await checkUniqueCode(object.SupplierCode)) {
            object.CreationDate = new Date().toISOString();
            let obj = { entityName: 'Suppliers', values: object };

            const res = await postData("/create/createone", obj);
            return res;
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
async function getAllSuppliers(query) {
    console.log({ query })
    try {
        const res = await getData(`/read/readMany/Suppliers`, query);
        for (let item of res.data) {
            const res = await countRows({ SupplierCode: item.Id, ...query });
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
        const res = await getData(`/read/readMany/Suppliers`, query);
        return res;
    }
    catch (error) {
        throw error;
    }
}

async function updateDetail(setting) {
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
            entityName: SQL_DB_SUPPLIERS, values: {
                SupplierCode: setting.SupplierCode, SupplierName: setting.SupplierName, LicensedDealerNumber: setting.LicensedDealerNumber, BookkeepingNumber: setting.BookkeepingNumber
                , ObjectiveBank: setting.ObjectiveBank, ConditionGushyPayment: setting.ConditionGushyPayment, PreferredPaymentDate: setting.PreferredPaymentDate,
                Ovligo: setting.Ovligo, Status: setting.Status, Street: setting.Street, HomeNumber: setting.HomeNumber, City: setting.City, ZipCode: setting.ZipCode, Phone1: setting.Phone1,
                Phone2: setting.Phone2, Mobile: setting.Mobile, Fax: setting.Fax, Mail: setting.Mail, Notes: setting.Notes
            }, condition: { Id: setting.Id }
        };
        const result = await putData('/update/updateOne', object);
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
        let obj = { entityName: 'Suppliers', values: { DisableUser: object.DisableUser, DisabledDate: new Date().toISOString(), Disabled: true }, condition: { Id: object.Id } }
        // console.log("obj", obj);
        const result = await deleteData('/delete/deleteone', obj);
        console.log({ result })
        if (result.status === 204) {
            obj = {
                entityName: 'Branches',
                values: { DisableUser: object.DisableUser, DisabledDate: new Date().toISOString(), Disabled: true },
                condition: { SupplierCode: object.Id }
            }
            const branchResult = await deleteData('/delete/deletemany', obj);
            console.log({ branchresult_status: branchResult.status })
            return result
        }
        else {
            return result
        }
        // console.log("result", result);


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
    let resultSupplierCode = await getData(`/read/readOne/${SQL_DB_SUPPLIERS}`, { SupplierCode: code });
    console.log({resultSupplierCode})
    if (resultSupplierCode.status === 200)
        return resultSupplierCode.data.length === 0
    else {
        return false
    }

}
async function checkUniqueName(name) {
    let resultSuppliersName = await getData(`/read/readOne/${SQL_DB_SUPPLIERS}`, { SupplierName: name });
    if (resultSuppliersName.status === 200)
        return resultSuppliersName.data.length === 0
    else {
        return false
    }
}

async function checkUnique(setting) {
    let resultSuppliersCode = checkUniqueCode(setting.SupplierCode);
    let resultSuppliersName = checkUniqueName(setting.SupplierName);
    return resultSuppliersCode && resultSuppliersName;
}

async function countRows(condition) {
    const countRowesBranches = await postData(`read/count/${SQL_DB_BRANCHES}`, { condition })
    // console.log("countRowesBranches:", countRowesBranches.data.recordset);
    return countRowesBranches.data;
}
module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkValid, checkUnique, getSupplier, updateDetail, checkUniqueCode, checkUniqueName, countRows };