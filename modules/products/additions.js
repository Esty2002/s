require('dotenv').config()
const { postData } = require("../../services/axios");
const { logToFile } = require('../../services/logger/logTxt');
const { checkObjectValidations } = require('../../services/validations/use-validations');
const { SQL_ADDITIONS_TABLE } = process.env
const { findMeasureName, findMeasureNumber } = require('./measure')

const values = [
    {
        entity: "Additions",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, AddedDate=null ,Enabled=null,DeleteDate=null}) => {
            return {
                tableName: "Additions",
                values: {
                    Name: Name,
                    UnitOfMeasure: UnitOfMeasure,
                    BookkeepingCode: BookkeepingCode,
                    AddedDate: new Date().toISOString(),
                    Enabled: true,
                    DeleteDate: null,
                },
                valuesFind: {
                    Name: Name,
                    UnitOfMeasure: UnitOfMeasure,
                    BookkeepingCode: BookkeepingCode,
                    AddedDate: AddedDate,
                    Enabled: Enabled,
                    DeleteDate: DeleteDate,
                }
            }
        }
    }
]

async function insertAddition(obj, tableName) {
    let objectForLog = {
        name: 'create',
        description: 'insert addition in module',
        obj: obj,
        tableName: tableName
    }
    logToFile(objectForLog)

    const checkValidObj = values.find(({ entity }) => tableName === entity);
    let newObj = checkValidObj.func(obj)
    if (checkValidObj) {
        _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
        obj = newObj.values
    }

    const measure = await findMeasureNumber(obj['UnitOfMeasure'])
    obj.UnitOfMeasure = measure.data[0].Id
    try {
        const response = await postData('/create/create', { tableName: SQL_ADDITIONS_TABLE, values: obj })
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

async function findAddition(project = [], filter = {},tableName) {
    const checkValidObj = values.find(({ entity }) => tableName === entity);
    let newObj = checkValidObj.func(filter)
    if (checkValidObj) 
        _ = await checkObjectValidations(newObj.valuesFind, checkValidObj.entity, true)

    if (!Object.keys(filter).includes('Enabled'))
        filter.Enabled = 1

    let columnsStr = project.length > 0 ? project.join(',') : '*'
    let conditionStr = filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : ""

    let objForLog = {
        name: "find",
        description: "find Addition in module",
        filter: conditionStr,
        project: columnsStr
    }
    logToFile(objForLog)

    const response = await postData("/read/readTopN", { tableName: SQL_ADDITIONS_TABLE, columns: columnsStr, condition: conditionStr })
    try {
        for (const finish of response.data) {
            if (Object.keys(finish).includes('UnitOfMeasure')) {
                const measureName = await findMeasureName(finish.UnitOfMeasure)
                finish['UnitOfMeasure'] = measureName.data[0].measure
            }
        }
        return response
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
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

async function updateAddition(obj = {}, filter = {}) {
    const response = await postData('/update/update', { entityName: SQL_ADDITIONS_TABLE, values: obj.data, condition: obj.condition })
    if (response.data)
        return true
    else
        return false
}

module.exports = { insertAddition, findAddition, updateAddition }
