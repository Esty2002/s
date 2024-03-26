require('dotenv').config()
const { postData, putData, getData, deleteData } = require('../../services/axios')
const { FINISH_PRODUCTS_ENTITY } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { logToFile } = require('../../services/logger/logTxt')
const { modelNames, getModelKey, compareObjects } = require('../utils/schemas')
const { ModelStatusTypes, ErrorTypes } = require('../../utils/types')
const { isEmptyObject } = require('../utils/object-code')



async function insertFinishProduct(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert finished product in module',
        obj,
        entityName: modelNames.FINISH_PRODUCTS
    }
    logToFile(objectForLog)
    try {
        const isValid = await checkObjectValidations(obj, modelNames.FINISH_PRODUCTS, ModelStatusTypes.CREATE)

        const response = await postData(`/create/createone/${modelNames.FINISH_PRODUCTS}`, {  data: obj })
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error
        logToFile(objectForLog)
        throw error
    }
}
async function updateFinishProduct({ data = {}, condition = {} }) {
    try {
        let origin;
        if (isEmptyObject(condition)) {
            const key = getModelKey(modelNames.FINISH_PRODUCTS);
            condition[key] = data[key]
            origin = await getData(`/read/readone/${modelNames.FINISH_PRODUCTS}/${data[key]}`)
        }
        else {
            origin = await getData(`/read/readMany/${modelNames.FINISH_PRODUCTS}`, condition)
        }
        if (origin.data) {
            const originObj = origin.data
            const updatedata = compareObjects({ data, origin: originObj, modelname: modelNames.FINISH_PRODUCTS })
            if (!isEmptyObject(updatedata)) {
                _ = await checkObjectValidations(updatedata, modelNames.FINISH_PRODUCTS, ModelStatusTypes.UPDATE)
                const response = await putData(`/update/updateone/${modelNames.FINISH_PRODUCTS}`, { data: updatedata, condition })
                if (response.status == 204) {
                    const location = JSON.parse(response.headers['content-location'])
                    // const { condition, count } = location
                    // console.log({ condition, count });
                    // if (count === 1) {
                    //     const updateData = await getData(`/read/readOne/${modelNames.ADDITION}`, condition)
                    //     console.log(updateData.data);
                    //     return updateData.data
                    // }
                    return location
                }
            }
            return false;
        }

    } catch (error) {
        throw error;
    }
}


async function deleteFinishProduct({ data = {}, condition = {} }) {
    try {
        _ = await checkObjectValidations(data, modelNames.FINISH_PRODUCTS, ModelStatusTypes.DELETE)
        const response = await deleteData(`/delete/deleteone/${modelNames.FINISH_PRODUCTS}`, { data, condition })
        return response

    } catch (error) {
        if (error.type === ErrorTypes.VALIDATION) {
            let errorMessage = error.data.reduce((message, { error }) => [...message, error], []).join(',')
            throw new Error(errorMessage);
        }
        throw error;
    }
}

async function findFinishProduct(filter = {}) {
    let objForLog = {
        name: "find",
        description: "find finish products in module",

    }
    try {
        _ = await checkObjectValidations(filter, modelNames.FINISH_PRODUCTS, false)
        if (!Object.keys(filter).includes('disabled'))
            filter.disabled = false
        let condition = filter;
        objForLog.filter = condition
        logToFile(objForLog)
        const response = await getData(`/read/readMany/${modelNames.FINISH_PRODUCTS}`, condition)
        return response
    }
    catch (error) {
        objForLog.error = error
        logToFile(objForLog)
        throw error
    }
}

module.exports = { insertFinishProduct, updateFinishProduct, deleteFinishProduct, findFinishProduct }
