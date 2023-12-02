// require('dotenv').config()
const { postData, getData, putData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { modelNames } = require('../../services/schemas')

const { UNITOFMEASURE_ENTITY } = process.env

const values = [
    {
        entity: "unitOfMeasure",
        func: ({ Measure }) => {
            return {
                entityName: "unitOfMeasure",
                values: {
                    Measure,
                    Disabled: false,
                }
            }
        }
    }
]

async function updateMeasure(condition, obj) {
    try {
        const response = await putData('/update/updateone', { entityName: UNITOFMEASURE_ENTITY, values: { measure: obj }, condition })
        if (response.status == 204)
            return response.data
        return false

    } catch (error) {
        throw error;
    }
}

async function insertMeasure(Measure) {
    let objectForLog = {
        name: 'insertMeasure',
        description: 'insert an unit of measure in module',
        obj: Measure,
        entityName: modelNames.MEASURES
    }
    logToFile(objectForLog)
    // const exist = await getData(`/read/exist/${SQL_UNIT_OF_MEASURE_TABLE}/measure/${name}`,name)
    console.log("im in get");
    // const { status, data } = exist
    // if (status === 200 && !data[0]) {
    try {
        const checkValidObj = values.find(({ entity }) => UNITOFMEASURE_ENTITY === entity);
        if (checkValidObj) {
            let newObj = checkValidObj.func(Measure)
            _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
            name = newObj.values
        }


        const response = await postData('/create/createone', { entityName: UNITOFMEASURE_ENTITY, values: name })
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
    // }
    // else {
    //     throw new Error(`data exist`)
    // }


}

async function deleteItem(object) {
    try {
        const response = await deleteData('/delete/deleteone', { entityName: UNITOFMEASURE_ENTITY, values: { disable: true }, condition: { id: object.Id } })
        if (response.status == 204) {
            return response.data
        }
        return false
    }
    catch (error) {
        throw error
    }

}

async function getAll() {
    let objectForLog = {
        name: 'getAll',
        description: 'get all unit of measure in module'
    }
    logToFile(objectForLog)

    try {
        const response = await getData(`/read/readMany/${UNITOFMEASURE_ENTITY}`)
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
            let res = await getData(`/read/readMany/${UNITOFMEASURE_ENTITY}`, { Measure: name })
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
            let res = await getData(`/read/readMany/${UNITOFMEASURE_ENTITY}`, { Id: num })
            if (res.data[0])
                return res;
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

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure, getAll, deleteItem }                
