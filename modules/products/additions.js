require('dotenv').config()
const { postData, putData, getData } = require("../../services/axios");
const { logToFile } = require('../../services/logger/logTxt');
const { checkObjectValidations } = require('../../services/validations/use-validations');
const { models } = require('../../services/schemas')
const { findMeasureName, findMeasureNumber } = require('./measure')

const values = [
    {
        entity: "additions",
        func: ({ name = null, unitOfMeasure = null, bookKeepingCode = null, addedDate = null, disabled=false, disableUser=undefined, disabledDate=undefined }) => {
            return {
                entityName: "additions",
                values: {
                    name,
                    unitOfMeasure,
                    bookKeepingCode,
                    addedDate: new Date().toISOString(),
                    disabled: false,
                    disabledDate:undefined,
                    disableUser: undefined
                },
                valuesFind: {
                    name,
                    unitOfMeasure,
                    bookKeepingCode,
                    addedDate,
                    disabled,
                    disabledDate,
                    disableUser,
                }
            }
        }
    }
]

async function insertAddition(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert addition in module',
        obj: obj,
        entityName: SQL_ADDITIONS_TABLE
    }
    logToFile(objectForLog)

    const checkValidObj = values.find(({ entity }) => entity === models.ADDITIONS.entity);
    let newObj = checkValidObj.func(obj)
    if (checkValidObj) {
        try {
            _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
            obj = newObj.values



            const response = await postData('/create/createone', { entityName: models.ADDITIONS.entity, values: obj })
            if (response.data)
                return response
        }
        catch (error) {
            objectForLog.error = error.message
            logToFile(objectForLog)
            throw error
        }
    }
}

async function findAddition(filter = {}) {
    try {
        const checkValidObj = values.find(({ entity }) => models.ADDITIONS.entity === entity);
        console.log({ checkValidObj })
        let newObj = checkValidObj.func(filter)
        console.log({ newObj })
        if (checkValidObj)

            _ = await checkObjectValidations(newObj.valuesFind, checkValidObj.entity, true)

        if (!Object.keys(filter).includes('disabled'))
            filter.Disabled = 0

        let condition = filter;

        let objForLog = {
            name: "find",
            description: "find Addition in module",
            filter: condition,
        }
        logToFile(objForLog)
        const response = await getData(`/read/readMany/${models.ADDITIONS.entity}`, condition)

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
        console.log({error})
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

async function updateAddition(obj = {}) {
    try {
        const response = await putData('/update/updateone', { entityName: ADDITIONS_ENTITY, values: obj.data, condition: obj.condition })
        if (response.status == 204)
            return response.data
        else
            return false
    } catch (error) {
        throw error;
    }
}

module.exports = { updateAddition, findAddition, insertAddition }
