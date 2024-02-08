require('dotenv').config()
const { postData, putData, getData, deleteData } = require("../../services/axios");
const { logToFile } = require('../../services/logger/logTxt');
const { checkObjectValidations } = require('../../services/validations/use-validations');
const { ModelStatusTypes } = require('../../utils/types');
const { models, modelNames } = require('../utils/schemas')
const { findMeasureName, findMeasureNumber } = require('./measure')


async function insertAddition(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert addition in module',
        obj,
        entityName: modelNames.ADDITION
    }
    logToFile(objectForLog)
    try {
        const isValid = await checkObjectValidations(obj, modelNames.ADDITION, ModelStatusTypes.CREATE)
        if (isValid) {
            const response = await postData('/create/createone', { entityName: modelNames.ADDITION, data: obj })
            if (response.data)
                return response
        }
    }
    catch (error) {
        console.log({ error })
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

async function findAddition(filter = {}) {
    try {
        _ = await checkObjectValidations(filter, modelNames.ADDITION, ModelStatusTypes.UPDATE)

        if (!Object.keys(filter).includes('disabled'))
            filter.disabled = false

        let condition = filter;

        let objForLog = {
            name: "find",
            description: "find Addition in module",
            filter: condition,
        }
        logToFile(objForLog)
        const response = await getData(`/read/readMany/${modelNames.ADDITION}`, condition)

        // for (let finish of response.data) {
        //     if (Object.keys(finish).includes('UnitOfMeasure')) {
        //         const measureName = await findMeasureName(finish.UnitOfMeasure)
        //         finish['UnitOfMeasure'] = measureName.data[0].measure
        //     }
        // }
        return response
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        console.log({ error })
        throw error
    }


    // filter['enabled'] = 1
    // let answer = (await postData(  `/read/readTopN`, { tableName: SQL_ADDITIONS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
    // for (const add of answer) {
    //     if (Object.keys(add).includes('unitOfMeasure')) {
    //         add['unitOfMeasure'] = await findMeasureName(add['unitOfMeasure'])
    //     }
    // }
}

async function updateAddition({ data = {}, condition = {} }) {
    try {
            _ =await checkObjectValidations(data, modelNames.ADDITION, ModelStatusTypes.UPDATE)
        const response = await putData('/update/updateone', { entityName: modelNames.ADDITION,  data, condition })
        return response
    } catch (error) {
        throw error;
    }
}

async function deleteAddition({ data = {}, condition = {} }) {
    try {
        _ = await checkObjectValidations(data, modelNames.ADDITION, ModelStatusTypes.DELETE)
        const response = await deleteData('/delete/deleteone', { entityName: modelNames.ADDITION,  data, condition })
        return response

    } catch (error) {

        throw error;
    }
}

module.exports = { updateAddition, findAddition, insertAddition, deleteAddition }
