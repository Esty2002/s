const { postData, putData, getData, deleteData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { modelNames, compareObjects, getModelKey } = require('../utils/schemas')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { findMeasureNumber, findMeasureName } = require('./measure')
const { ModelStatusTypes } = require('../../utils/types')
const { getAll } = require('./pumpsCombinations')
const { isEmptyObject } = require('../utils/object-code')

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
            const response = await postData(`/create/createone/${modelNames.PUMPS}`, { data: obj })
            if (response.data)
                return response
        }
    }
    catch (error) {
        objectForLog.error = error
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
        if (!Object.keys(filter).includes('disabled'))
            filter.disabled = false
        let condition = filter
        const response = await getData(`/read/readMany/${modelNames.PUMPS}`, condition)
        return response
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)

        throw error
    }

}

async function isPumpAddition({ condition }) {
    try {
        const response = await getData(`/read/readMany/${modelNames.PUMPS}`, condition)
        const list = response.data
        return list.every(({ addition }) => addition)
    }
    catch (error) {
        throw error
    }
}

async function updatePump({ data = {}, condition = {} }) {
    try {
        let origin;
        if (isEmptyObject(condition)) {
            const key = getModelKey(modelNames.PUMPS);
            condition[key] = data[key]
            origin = await getData(`/read/readone/${modelNames.PUMPS}/${data[key]}`)
        }
        else {
            origin = await getData(`/read/readMany/${modelNames.PUMPS}`, condition)
        }
        if (origin.data) {
            const originObj = origin.data
            console.log({originObj});
            const updatedata = compareObjects({ data, origin: originObj, modelname: modelNames.PUMPS })
            console.log({updatedata})
            if (!isEmptyObject(updatedata)) {
                _ = await checkObjectValidations(updatedata, modelNames.PUMPS, ModelStatusTypes.UPDATE)
                const response = await putData(`/update/updateone/${modelNames.PUMPS}`, { data: updatedata, condition })
               return response ;
            }
            return false;
        }

    } catch (error) {

        throw error;
    }
}

async function deletePump({ data = {}, condition = {} }) {
    try {
        _ = await checkObjectValidations(data, modelNames.PUMPS, ModelStatusTypes.DELETE)
        const response = await deleteData(`/delete/deleteone/${modelNames.PUMPS}`, { data: data, condition: condition })
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
