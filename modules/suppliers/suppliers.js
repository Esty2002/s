require('dotenv').config();
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { getData, postData, putData, deleteData } = require('../../services/axios');
const { ErrorTypes, ModelStatusTypes } = require('../../utils/types');
const { models, modelNames } = require('../utils/schemas');

async function insertOneSupplier(object) {

    try {
        let ans = await checkObjectValidations(object, models.SUPPLIERS.entity)

        if (ans) {
            const uniquename = await checkUniqueName(object.supplierName)
            const uniquecode = await checkUniqueCode(object.supplierCode)
            console.log(uniquecode, uniquename)
            if (uniquename && uniquecode) {
                object.addedDate = new Date().toISOString();
                object.userName = 'developer';
                object.disabled = false
                let obj = { entityName: models.SUPPLIERS.entity, data: object };

                const res = await postData("/create/createone", obj);
                return res;
            }
            else {
                const error = { type: ErrorTypes.VALIDATION }
                error.data = []
                if (!uniquename) {
                    error.data.push({ propertyName: 'supplierName', error: `Supplier's name '${object.supplierName}' is not unique.` })
                }
                if (!uniquecode) {
                    error.data.push({ propertyName: 'supplierCode', error: `Supplier's code '${object.supplierCode}' is not unique.` })
                }
                throw error
            }
        }

    }
    catch (error) {
        console.log({ error })
        if (error.type === ErrorTypes.VALIDATION) {
            let errorMessage = error.data.reduce((message, { error }) => [...message, error], []).join(',')
            throw new Error(errorMessage);
        }
        throw error;
    }
}
async function getAllSuppliers(query) {
    try {
        const res = await getData(`/read/readMany/${modelNames.SUPPLIERS}`, query);
        for (let item of res.data) {
            const res = await countBranches({ supplierCode: item.id, ...query });
            if (res) {
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
        const res = await getData(`/read/readMany/suppliers`, query);
        return res;
    }
    catch (error) {
        throw error;
    }
}

async function updateDetail(setting) {
    try {
        await checkObjectValidations(setting, modelNames.SUPPLIERS, ModelStatusTypes.UPDATE);
        flag = true
        let object = {
            entityName: modelNames.SUPPLIERS, data: {
                ...setting
            }, condition: { id: setting.Id }
        };
        const result = await putData('/update/updateOne', object);
        return result;
    }
    catch (error) {
        console.log(error.message)
        throw new Error('can not update branch');
    }
}
async function deleteSupplier(object) {
    try {
        object = await checkObjectValidations(object, models.SUPPLIERS.entity, ModelStatusTypes.DELETE)
        console.log({ object });
        let obj = { entityName: 'suppliers', data: object, condition: { id: object.id } }
        const result = await deleteData('/delete/deleteone', obj);
        return result
    }
    catch (error) {
        if (error.type === ErrorTypes.VALIDATION) {
            let errorMessage = error.data.reduce((message, { error }) => [...message, error], []).join(',')
            throw new Error(errorMessage);
        }

        throw error
    }

}

async function checkUniqueCode(code) {
    let resultSupplierCode = await getData(`/read/readOne/suppliers`, { supplierCode: code });
    if (resultSupplierCode.status === 200)
        return resultSupplierCode.data.length === 0
    else {
        return false
    }
}

async function checkUniqueName(name) {
    let resultSuppliersName = await getData(`/read/readOne/suppliers`, { supplierName: name });
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

async function countBranches(condition) {
    const countRowsBranches = await postData(`read/count/${modelNames.BRANCHES}`, { condition })
    return countRowsBranches.data;
}
module.exports = { deleteSupplier, getAllSuppliers, insertOneSupplier, checkUnique, getSupplier, updateDetail, checkUniqueCode, checkUniqueName, countBranches };