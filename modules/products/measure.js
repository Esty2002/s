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
    return (await postData('/update/update', { entityName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` }))
}

async function insertMeasure(name) {
    const exist = await getData(`/read/exist/${SQL_UNIT_OF_MEASURE_TABLE}/measure/${name}`)
    console.log('after exist');
    const { status, data } = exist
    console.log({ status, data });
    console.log(!data, '!');
    if (status === 200 && !data[0]) {
        console.log({ name });
        const response = await postData('/create/createone', { entityName: SQL_UNIT_OF_MEASURE_TABLE, values: { Measure: name, Disable: 0 } })
        console.log(response + 'hjhfdefjhg');
        return response
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
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

async function findMeasureNumber(name) {
    let objectForLog = {
        name: 'findMeasureNumber',
        description: 'findMeasureNumber in module measure',
        obj: name
    }
    logToFile(objectForLog)
    try {
        if (name) {
            let res = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/Measure='${name}'`)
            if (res.data[0])
                return res;
            else
                throw new Error('no matching unit of measure')
        }
        else
            throw new Error('The name of the unit of measure is reuired')
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

async function findMeasureName(num) {
    let objectForLog = {
        name: 'findMeasureName',
        description: 'findMeasureName in module measure',
        obj: num
    }
    logToFile(objectForLog)
    try {
        if (num && parseInt(num)) {
            const measure = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/Id=${num}`)
            if (measure.data[0])
                return measure;
            else
                throw new Error('no matching unit of measure')
        }
        else
            throw new Error('The id of the unit of measure is reuired with type int')
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }

}

async function deleteItem(object) {
    const response = await postData('/update/update', { entityName: SQL_UNIT_OF_MEASURE_TABLE, values: { Disable: true }, condition: { Id: object.Id } })
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
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure, getAll, deleteItem }                
