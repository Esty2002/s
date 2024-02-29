require('dotenv').config()
const { postData, putData, getData, deleteData } = require('../../services/axios')
const { FINISH_PRODUCTS_ENTITY } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { logToFile } = require('../../services/logger/logTxt')
const { modelNames } = require('../utils/schemas')
const { ModelStatusTypes, ErrorTypes } = require('../../utils/types')



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

        const response = await postData('/create/createone', { entityName: modelNames.FINISH_PRODUCTS, data: obj })
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        if(error.type === ErrorTypes.VALIDATION){
            let errorMessage = error.data.reduce((message, {error})=>[...message, error], [] ).join(',')
            throw new Error(errorMessage);
        }
        throw error
    }
}
async function updateFinishProduct({ data = {}, condition = {} }) {
    try {
        _ = await checkObjectValidations(data, modelNames.FINISH_PRODUCTS, ModelStatusTypes.UPDATE)
        const response = await putData('/update/updateone', { entityName: modelNames.FINISH_PRODUCTS,  data, condition })
        return response

    } catch (error) {
        if(error.type === ErrorTypes.VALIDATION){
            let errorMessage = error.data.reduce((message, {error})=>[...message, error], [] ).join(',')
            throw new Error(errorMessage);
        }
        throw error;
    }
}


async function deleteFinishProduct({ data = {}, condition = {} }) {
    try {
        _ = await checkObjectValidations(data, modelNames.FINISH_PRODUCTS, ModelStatusTypes.DELETE)
        const response = await deleteData('/delete/deleteone', { entityName: modelNames.FINISH_PRODUCTS,  data, condition })
        return response

    } catch (error) {
        if(error.type === ErrorTypes.VALIDATION){
            let errorMessage = error.data.reduce((message, {error})=>[...message, error], [] ).join(',')
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
        if(error.type === ErrorTypes.VALIDATION){
            let errorMessage = error.data.reduce((message, {error})=>[...message, error], [] ).join(',')
            throw new Error(errorMessage);
        }
        throw error
    }
}

module.exports = { insertFinishProduct, updateFinishProduct, deleteFinishProduct, findFinishProduct }
