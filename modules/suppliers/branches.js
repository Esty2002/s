require('dotenv').config();
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { getData, postData, putData, deleteData, } = require('../../services/axios');
const { modelNames } = require('../utils/schemas');
const { ErrorTypes } = require('../../utils/types');

async function insertOneBranch(object, entityName = modelNames.BRANCHES) {
    try {
        let ans = await checkObjectValidations(object, entityName)
        console.log("inmsertBranch - module");
        if (ans) {
            if (await checkUnique(object)) {
                object.addedDate = new Date().toISOString();
                let obj = { entityName, data: object };
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
        if(error.type === ErrorTypes.VALIDATION){
            let errorMessage = error.data.reduce((message, {error})=>[...message, error], [] ).join(',')
            throw new Error(errorMessage);
        }
        throw new Error('can not insert branch');
    }
}
async function getAllBranches() {
    try {
        const res = await getData(`/read/readAll/${modelNames.BRANCHES}`, { Disabled: '0' });
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
        console.log("updatadetails", setting);
        console.log(setting.id)
      await  checkObjectValidations(setting, modelNames.BRANCHES);
        // if (setting.OldBranchName !== setting.BranchName) {
        //     const result = await getData(`/read/readAll/Branches/BranchName ='${setting.BranchName}' AND SupplierCode=${code} AND Disabled='0'`);
        //     if (result.data.length !== 0) {
        //         return false;
        //     }
        // }
        let obj = {
            entityName: modelNames.BRANCHES, data: {...setting}, condition: { id: setting.id }
        }
        const res = await putData("/update/updateone", obj);
        console.log(res);
        return res;
    }
    catch (error) {
        if(error.type === ErrorTypes.VALIDATION){
            const errorMessage = error.data.reduce((message, {error})=>[...message, error], []).join(',')
            throw new Error(errorMessage)
         }
        throw new Error('can not update branch');
    }
}

async function deleteBranches(object) {
    try {
        const newDate = new Date().toISOString();
        let obj = { entityName: modelNames.BRANCHES, data: { disableUser: `${object.disableUser}`, disabled: true, disabledDate: newDate }, condition: { id: object.id } };
        const res = await deleteData("/delete/deleteone", obj);
        return res;
    }
    catch (error) {
        console.log(error.message)
        throw new Error('can not delete branch');
    }
}



async function checkUnique(object) {
    try {
        const resultSupplierExist = await getData(`/read/readOne/${modelNames.SUPPLIERS}`, { id: object.supplierCode, disabled: 0 });
        const resultBranchName = await getData(`/read/readOne/${modelNames.BRANCHES}`, { branchName: object.branchName, supplierCode: object.supplierCode, disabled: false });
        return (resultBranchName.data.length === 0 && (resultSupplierExist.data.length !== 0));

    }
    catch (error) {
        throw new Error('can not insert branch');
    }
}

module.exports = { getAllBranches, getBranchById, insertOneBranch, updateDetail, deleteBranches, getBranchesByCondition, checkUnique };
