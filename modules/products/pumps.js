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
            const response = await postData('/create/createone', { entityName: modelNames.PUMPS, values: obj })
            if (response.data)
                return response
        }
    }
    catch (error) {
        console.log(error)
        objectForLog.error = error.message
        logToFile(objectForLog)
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
        console.log({ validation })
        if (!Object.keys(filter).includes('disabled'))
            filter.disabled = false
        let condition = filter
        const response = await getData(`/read/readMany/${modelNames.PUMPS}`, condition)
        return response
    }
    catch (error) {
        console.log({ error })
        objForLog.error = error.message
        logToFile(objForLog)
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

        const response = await putData('/update/updateone', { entityName: modelNames.PUMPS, values: data, condition: condition })
        return response
    } catch (error) {
        throw error;
    }
}

async function deletePump({ data = {}, condition = {} }) {
    try {
            _ = await checkObjectValidations(data, modelNames.PUMPS, ModelStatusTypes.DELETE)
          

        const response = await deleteData('/delete/deleteone', { entityName: modelNames.PUMPS, values: data, condition: condition })
        return response
    } catch (error) {
        throw error;
    }
}

module.exports = { updatePump, insertPump, findPump, deletePump }
