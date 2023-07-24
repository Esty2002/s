require('dotenv').config()
const { postData, putData } = require("../../services/axios");
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

async function insertAddition(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert addition in module',
        obj: obj,
        tableName: SQL_ADDITIONS_TABLE
    }
    logToFile(objectForLog)

<<<<<<< HEAD
    const checkValidObj = values.find(({ entity }) => SQL_ADDITIONS_TABLE === entity);
=======
    const checkValidObj = values.find(({ entity }) => tableName === entity);
>>>>>>> f5291c0209296599f25d5a979c5fd995441c5200
    let newObj = checkValidObj.func(obj)
    if (checkValidObj) {
        _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
        obj = newObj.values
    }

    const measure = await findMeasureNumber(obj['UnitOfMeasure'])
    obj.UnitOfMeasure = measure.data[0].Id
    try {
        const response = await postData('/create/createone', { tableName: SQL_ADDITIONS_TABLE, values: obj })
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

<<<<<<< HEAD
async function findAddition(filter = {}) {
=======
async function findAddition(project = [], filter = {},tableName) {
    const checkValidObj = values.find(({ entity }) => tableName === entity);
    let newObj = checkValidObj.func(filter)
    if (checkValidObj) 
        _ = await checkObjectValidations(newObj.valuesFind, checkValidObj.entity, true)

>>>>>>> f5291c0209296599f25d5a979c5fd995441c5200
    if (!Object.keys(filter).includes('Enabled'))
        filter.Enabled = 1

    let condition;
    filter ? condition[Object.keys(filter)[0]] = Object.values(filter)[0] : null

    let objForLog = {
        name: "find",
        description: "find Addition in module",
        filter: condition,
    }
    logToFile(objForLog)
<<<<<<< HEAD
    const response = await getData(`/read/readMany/${SQL_ADDITIONS_TABLE}`, { condition })
=======

    const response = await postData("/read/readTopN", { tableName: SQL_ADDITIONS_TABLE, columns: columnsStr, condition: conditionStr })
>>>>>>> f5291c0209296599f25d5a979c5fd995441c5200
    try {
        for (let finish of response.data) {
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

<<<<<<< HEAD
async function updateAddition(obj = {}) {
    try {
        const response = await putData('/update/updateone', { entityName: SQL_ADDITIONS_TABLE, values: obj.data, condition: obj.condition })
        if (response.status == 204)
            return response.data
        else
            return false
    } catch (error) {
        throw error;
    }
=======
async function updateAddition(obj = {}, filter = {}) {
    const response = await postData('/update/update', { entityName: SQL_ADDITIONS_TABLE, values: obj.data, condition: obj.condition })
    if (response.data)
        return true
    else
        return false
>>>>>>> f5291c0209296599f25d5a979c5fd995441c5200
}

module.exports = { insertAddition, findAddition, updateAddition }
