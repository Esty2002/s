require('dotenv').config()
const { postData, putData, } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { findMeasureNumber, findMeasureName } = require('./measure')

const { SQL_PUMPS_TABLE } = process.env

const values = [
    {
        entity: "Pumps",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, Addition = null,AddedDate=null ,Enabled=null,DeleteDate=null}) => {
            return {
                entityName: "Pumps",
                values: {
                    Name: Name,
                    UnitOfMeasure: UnitOfMeasure,
                    BookkeepingCode: BookkeepingCode,
                    Addition: Addition,
                    AddedDate: new Date().toISOString(),
                    Enabled: true,
                    DeleteDate: null,
                },
                valuesFind: {
                    Name: Name,
                    UnitOfMeasure: UnitOfMeasure,
                    BookkeepingCode: BookkeepingCode,
                    Addition: Addition,
                    AddedDate: AddedDate,
                    Enabled: Enabled,
                    DeleteDate: DeleteDate,
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
        _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
        obj = newObj.values
    }

    const measure = await findMeasureNumber(obj['UnitOfMeasure'])
    obj.UnitOfMeasure = measure.data[0].Id
    try {
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

async function findPump(filter = {}) {
    const checkValidObj = values.find(({ entity }) => SQL_PUMPS_TABLE === entity);
    let newObj = checkValidObj.func(filter)
    if (checkValidObj) 
        _ = await checkObjectValidations(newObj.valuesFind, checkValidObj.entity, true)

    if (!Object.keys(filter).includes('Enabled'))
        filter.Enabled = 1

    let condition ;
     filter ? condition[Object.keys(filter)[0]] = Object.values(filter)[0] : null

    let objForLog = {
        name: "find",
        description: "find pumps in module",
        filter: condition
    }
    logToFile(objForLog)

    const response = await getData(`/read/readMany/${SQL_PUMPS_TABLE}`, condition )
    try {
        for (const finish of response.data) {
            if (Object.keys(finish).includes('UnitOfMeasure')) {
                const measureName = await findMeasureName(finish.UnitOfMeasure)
                finish['UnitOfMeasure'] = measureName
            }
        }
        return response
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
    
}

async function updatePump(obj) {
    try {
        const response = await putData('/update/updateone', { entityName: SQL_PUMPS_TABLE, values: obj.data, condition: obj.condition})
        if (response.status == 204)
            return response.data
        return false

    } catch (error) {
        throw error;
    }
}

module.exports = { updatePump, insertPump, findPump }
