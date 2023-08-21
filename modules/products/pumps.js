require('dotenv').config()
const { postData, putData, getData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { findMeasureNumber, findMeasureName } = require('./measure')

const { SQL_PUMPS_TABLE } = process.env

const values = [
    {
        entity: "Pumps",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, Addition = null, AddedDate = null, Enabled = null, DeleteDate = null }) => {
            return {
                entityName: "Pumps",
                values: {
                    Name,
                    UnitOfMeasure,
                    BookkeepingCode,
                    Addition,
                    AddedDate: new Date().toISOString(),
                    Disabled: false,
                    DisableUser:undefined,
                    DisabledDate: null,
                },
                valuesFind: {
                    Name,
                    UnitOfMeasure,
                    BookkeepingCode,
                    Addition,
                    AddedDate,
                    Disabled,
                    DisabledDate,
                    DisableUser
                }
            }
        }
    }
]

async function insertPump(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert pump in module',
        obj: obj,
        entityName: SQL_PUMPS_TABLE
    }
    logToFile(objectForLog)
    const checkValidObj = values.find(({ entity }) => SQL_PUMPS_TABLE === entity);
    let newObj = checkValidObj.func(obj)
    if (checkValidObj) {
        try {
            _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
            obj = newObj.values

            const response = await postData('/create/createone', { entityName: SQL_PUMPS_TABLE, values: obj })
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

async function findPump(filter = {}) {
    const checkValidObj = values.find(({ entity }) => SQL_PUMPS_TABLE === entity);
    let newObj = checkValidObj.func(filter)
    if (checkValidObj)
        _ = await checkObjectValidations(newObj.valuesFind, checkValidObj.entity, true)

    if (!Object.keys(filter).includes('Disabled'))
        filter.Disabled = 0

    let condition = filter

    let objForLog = {
        name: "find",
        description: "find pumps in module",
        filter: condition
    }
    logToFile(objForLog)

    try {
        const response = await getData(`/read/readMany/${SQL_PUMPS_TABLE}`, condition)

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
        const response = await putData('/update/updateone', { entityName: SQL_PUMPS_TABLE, values: obj.data, condition: obj.condition })
        if (response.status == 204)
            return response.data
        return false

    } catch (error) {
        throw error;
    }
}

module.exports = { updatePump, insertPump, findPump }
