// require('dotenv').config()
const { postData, getData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { checkObjectValidations } = require('../../services/validations/use-validations')

const { SQL_UNIT_OF_MEASURE_TABLE } = process.env


const values = [
    {
        entity: "UnitOfMeasure",
        func: ({ Name = null }) => {
            return {
                tableName: "UnitOfMeasure",
                values: {
                    Measure: Name,
                    Disable: false,
                }
            }
        }
    }
]


async function updateMeasure(condition, obj) {
    return (await postData('/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` })).data
}

async function insertMeasure(name, tableName) {
    let objectForLog = {
        name: 'insertMeasure',
        description: 'insert an unit of measure in module',
        obj: name,
        tableName: tableName
    }
    logToFile(objectForLog)

    const checkValidObj = values.find(({ entity }) => tableName === entity);
    let newObj = checkValidObj.func({ Name: name })
    if (checkValidObj) {
        _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
        name = newObj.values
    }

    try {
        const response = await postData('/create/create', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: name })
        if (response.data)
            return true
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}



async function findMeasureNumber(name) {
    let a = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/Measure ='${name}'`)
    if (a.data[0])
        return a.data[0].Id;
    return { error: 'no matching unit of measure' }
}
async function findMeasureName(num) {
    const measure = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/Id=${num}`)
    if (measure.data[0])
        return measure.data[0].Measure;
    return { error: 'no matching unit of measure' }
}

async function deleteItem(object) {
    const response = await postData('/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { Disable: true }, condition: { Id: object.Id } })
    return response
}
async function getAll() {
    let objectForLog = {
        name: 'getAll',
        description: 'get all unit of measure in module'
    }
    logToFile(objectForLog)

    try {
        const response = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}`)
        if (response)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure, getAll, deleteItem }                
