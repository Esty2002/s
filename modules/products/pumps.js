const { postData, putData, getData, deleteData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { modelNames } = require('../utils/schemas')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { findMeasureNumber, findMeasureName } = require('./measure')
const { ModelStatusTypes } = require('../../utils/types')
const { getAll } = require('./productsCombinations')

async function insertPump(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert pump in module',
        obj: obj,
        entityName: modelNames.PUMPS
    }
    logToFile(objectForLog)
    try {
        const isValid = await checkObjectValidations(obj, modelNames.PUMPS, ModelStatusTypes.CREATE)
        if (isValid) {
            const response = await postData('/create/createone', { entityName: modelNames.PUMPS, data: obj })
            if (response.data)
                return response
        }
    }
    catch (error) {
        console.log(error)
        objectForLog.error = error.message
        logToFile(objectForLog)
        if (error.type === ErrorTypes.VALIDATION) {
            let errorMessage = error.data.reduce((message, { error }) => [...message, error], []).join(',')
            throw new Error(errorMessage);
        }
        throw error
    }
}

async function findPump(filter = {}) {
    let objForLog = {
        name: "find",
        description: "find pumps in module",
        filter
    }
    logToFile(objForLog)
    try {
        const validation = await checkObjectValidations(filter, modelNames.PUMPS, ModelStatusTypes.UPDATE)
        if (!Object.keys(filter).includes('disabled'))
            filter.disabled = false
        let condition = filter
        const response = await getData(`/read/readMany/${modelNames.PUMPS}`, condition)
        return response
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        if (error.type === ErrorTypes.VALIDATION) {
            let errorMessage = error.data.reduce((message, { error }) => [...message, error], []).join(',')
            throw new Error(errorMessage);
        }
        throw error
    }

}

async function isPumpAddition({ condition }) {
    try {
        const response = await getData(`/read/readMany/${modelNames.ADDITION}`, condition)
        const list = response.data
        return list.every(({ addition }) => addition)
    }
    catch (error) {
        throw error
    }
}

async function updatePump({ data = {}, condition = {} }) {
    try {
        _ = await checkObjectValidations(data, modelNames.PUMPS, ModelStatusTypes.UPDATE)

        const response = await putData('/update/updateone', { entityName: modelNames.PUMPS, data: data, condition: condition })
        if (response.status == 204) {
            const location = JSON.parse(response.headers['content-location'])
            const { condition, rowsAffected } = location
            if (rowsAffected === 1) {
                const updateData = await getData(`/read/readOne/${modelNames.MEASURES}`, condition)
                return updateData.data
            }
        }
        return response
    } catch (error) {
        if (error.type === ErrorTypes.VALIDATION) {
            let errorMessage = error.data.reduce((message, { error }) => [...message, error], []).join(',')
            throw new Error(errorMessage);
        }
        throw error;
    }
}

async function deletePump({ data = {}, condition = {} }) {
    try {
        _ = await checkObjectValidations(data, modelNames.PUMPS, ModelStatusTypes.DELETE)
        const response = await deleteData('/delete/deleteone', { entityName: modelNames.PUMPS, data: data, condition: condition })
        return response
    } catch (error) {
        if (error.type === ErrorTypes.VALIDATION) {
            let errorMessage = error.data.reduce((message, { error }) => [...message, error], []).join(',')
            throw new Error(errorMessage);
        }
        throw error;
    }
}

module.exports = { updatePump, insertPump, findPump, deletePump }
