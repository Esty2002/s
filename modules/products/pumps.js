const { postData, putData, getData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { modelNames } = require('../utils/schemas')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { findMeasureNumber, findMeasureName } = require('./measure')

async function insertPump(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert pump in module',
        obj: obj,
        entityName: SQL_PUMPS_TABLE
    }
    logToFile(objectForLog)
    try {
        _ = await checkObjectValidations(obj, modelNames.PUMPS, true)
        obj = newObj.values

        const response = await postData('/create/createone', { entityName: modelNames.PUMPS, values: obj })
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

async function findPump(filter = {}) {

    try {
        _ = await checkObjectValidations(filter, modelNames.PUMPS, )

        if (!Object.keys(filter).includes('disabled'))
            filter.disabled = 0

        let condition = filter

        let objForLog = {
            name: "find",
            description: "find pumps in module",
            filter: condition
        }
        logToFile(objForLog)

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

async function updatePump(obj) {
    try {
        const response = await putData('/update/updateone', { entityName: modelNames.PUMPS, values: obj.data, condition: obj.condition })
        if (response.status == 204)
            return response.data
        return false

    } catch (error) {
        throw error;
    }
}

module.exports = { updatePump, insertPump, findPump }
