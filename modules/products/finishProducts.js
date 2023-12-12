require('dotenv').config()
const { postData, putData, getData, deleteData } = require('../../services/axios')
const { FINISH_PRODUCTS_ENTITY } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { logToFile } = require('../../services/logger/logTxt')
const { modelNames } = require('../utils/schemas')



async function insertFinishProduct(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert  finished product in module',
        obj: obj,
        entityName: modelNames.FINISH_PRODUCTS
    }
    logToFile(objectForLog)
    try {
        _ = await checkObjectValidations(obj, modelNames.FINISH_PRODUCTS, true)
        obj = newObj.values


        const response = await postData('/create/createone', { entityName: modelNames.FINISH_PRODUCTS, values: obj })
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}
async function updateFinishProduct(obj) {
    try {
        const { condition, data } = obj
        const response = await putData('/update/updateone', { entityName: modelNames.FINISH_PRODUCTS, values: data, condition })
        if (response.status == 204)
            return response.data
        else
            return false

    } catch (error) {
        throw error;
    }
}

async function deleteFinishProduct({ condition }) {
    try {

        const response = await deleteData('/delete/deleteone', { entityName: modelNames.FINISH_PRODUCTS, values: { disabled: true, disableUser: 'developer', disabledDate: new Date() }, condition })
        if (response.status == 204)
            return response.data
        else
            return false

    } catch (error) {
        throw error;
    }
}

async function findFinishProduct(filter = {}) {
    try {
        _ = await checkObjectValidations(filter, modelNames.FINISH_PRODUCTS, false)
        if (!Object.keys(filter).includes('disabled'))
            filter.disabled = false
        let condition = filter;
        console.log({ filter })
        let objForLog = {
            name: "find",
            description: "find finish products in module",
            filter: condition
        }
        logToFile(objForLog)


        const response = await getData(`/read/readMany/${modelNames.FINISH_PRODUCTS}`, condition)
        console.log(response.data)
        // for (const finish of response.data) {
        //     if (Object.keys(finish).includes('UnitOfMeasure')) {
        //         const measureName = await findMeasureName(finish.UnitOfMeasure)
        //         finish['UnitOfMeasure'] = measureName
        //     }
        // }
        return response
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

module.exports = { insertFinishProduct, updateFinishProduct, deleteFinishProduct, findFinishProduct }
