require('dotenv').config();
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { getData, postData, putData, deleteData, } = require('../../services/axios');
const { modelNames } = require('../../services/schemas');

async function insertOneBranch(object) {
    try {
        let ans = await checkObjectValidations(object, 'Branches')
        console.log("inmsertBranch - module");
        if (ans) {
            if (checkValid(object) && await checkUnique(object)) {
                object['CreationDate'] = new Date().toISOString();
                let obj = { entityName: 'Branches', values: object };
                const res = await postData("/create/createone", obj);
                return res;
            }
            else {
                return false;
            }
        }

    }
    catch (error) {
        console.log(error)
        throw new Error('can not insert branch');
    }
}
async function getAllBranches() {
    try {
        const res = await getData(`/read/readAll/${modelNames.BRANCHES}`, {Disabled : '0'});
        return res.data;
    }
    catch (error) {
        throw new Error('can not get all the branches')
    }
}

async function getBranches(supplierid, disabled) {
    try {
        const response = await postData('/read/count', {
            entityName: 'branches', condition: {
                supplierid, disabled
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error.message)
        throw error
    }
}

async function getBranchById(query) {
    console.log({ query });
    try {
        const res = await getData(`/read/readOne/branches`, query);
        return res.data[0];
    }
    catch (error) {
        throw error;
    }
}


async function getBranchesByCondition(query) {
    console.log({ query });
    try {
        const res = await getData(`/read/readMany/branches`, query);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}


async function updateDetail(setting) {
    try {
        console.log("updatadetails", setting.BranchName);
        console.log(setting.Id)
        // if (setting.OldBranchName !== setting.BranchName) {
        //     const result = await getData(`/read/readAll/Branches/BranchName ='${setting.BranchName}' AND SupplierCode=${code} AND Disabled='0'`);
        //     if (result.data.length !== 0) {
        //         return false;
        //     }
        // }
        let obj = {
            entityName: modelNames.BRANCHES, values: {
                supplierCode: setting.supplierCode.id, BranchName: setting.BranchName, Status: setting.Status,
                Street: setting.Street, HomeNumber: setting.HomeNumber, City: setting.City, ZipCode: setting.ZipCode, Phone1: setting.Phone1,
                Phone2: setting.Phone2, Mobile: setting.Mobile, Fax: setting.Fax, Mail: setting.Mail, Notes: setting.Notes
            }, condition: { Id: setting.Id }
        }
        const res = await putData("/update/updateone", obj);
        console.log(res);
        return res;
    }
    catch {
        throw new Error('can not update branch');
    }
}

async function deleteBranches(object) {
    try {
        const newDate = new Date().toISOString();
        let obj = { entityName: modelNames.BRANCHES, values: { disableUser: `${object.disableUser}`, disabled: true, disabledDate: newDate }, condition: { id: object.id } };
        const res = await deleteData("/delete/deleteone", obj);
        return res;
    }
    catch (error) {
        console.log(error.message)
        throw new Error('can not delete branch');
    }
}

function checkValid(object) {
    let mustKeys = ["supplierCode", "branchName", "street", "homeNumber", "city", "phone1"/*, "UserThatInsert"*/];
    let array = Object.keys(object);
    console.log("must-----",array);
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && object[mustKeys[i]] === "")) {
            return false;
        }
    }
    return true;
}

async function checkUnique(object) {
    try {
        const resultSupplierExist = await getData(`/read/readOne/${modelNames.SUPPLIERS}`, { Id: object.SupplierCode, Disabled: 0 });
        const resultBranchName = await getData(`/read/readOne/${modelNames.BRANCHES}`, { branchName: object.branchName, supplierCode: object.supplierCode, disabled: false });
        return (resultBranchName.data.length === 0 && (resultSupplierExist.data.length !== 0));

    }
    catch (error) {
        throw new Error('can not insert branch');
    }
}

module.exports = { getAllBranches, getBranchById, insertOneBranch, updateDetail, deleteBranches, getBranchesByCondition, checkUnique, checkValid };
