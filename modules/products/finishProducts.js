require('dotenv').config()
const { postData, putData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { logToFile } = require('../../services/logger/logTxt')

const values = [
    {
        entity: "finishProducts",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, AddedDate=null,Enabled=null,DeleteDate=null,}) => {
            return {
                entityName: "finishProducts",
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

async function insertFinishProduct(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert  finished product in module',
        obj: obj,
        entityName: SQL_FINISH_PRODUCTS_TABLE
    }
    logToFile(objectForLog)

    // obj.enabled = true
    // obj.addedDate = new Date().toISOString()
    // const response = await postData('/create/createone', { entityName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
    // console.log("after post");
    // if (response.status === 201) {
    //     console.log("in status");
    //     return true
    // }

    const checkValidObj = values.find(({ entity }) => SQL_FINISH_PRODUCTS_TABLE === entity);
    let newObj = checkValidObj.func(obj)
    if (checkValidObj) {
        console.log("before validation");
        _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
        console.log("after validation");
        obj = newObj.values
    }
    const measure = await findMeasureNumber(obj['UnitOfMeasure'])
    obj.UnitOfMeasure = measure.data[0].Id
    try {
        const response = await postData('/create/createone', { entityName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
        if (response.data)
            return response
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}
async function updateFinishProduct(obj) {
    try {
        let condition;
        obj.condition ? condition[Object.keys(obj.condition)[0]] = Object.values(obj.condition)[0] : null
        const response = await putData('/update/updateone', { entityName: SQL_FINISH_PRODUCTS_TABLE, values: obj.data, condition: condition })
        if (response.status == 204)
            return response.data
        else
            return false

    } catch (error) {
        throw error;
    }
}

async function findFinishProduct(filter = {}) {
    
    
    const checkValidObj = values.find(({ entity }) => SQL_FINISH_PRODUCTS_TABLE === entity);
    let newObj = checkValidObj.func(filter)
    if (checkValidObj) 
        _ = await checkObjectValidations(newObj.valuesFind, checkValidObj.entity, true)

    if (!Object.keys(filter).includes('Enabled'))
        filter.Enabled = 1

    let condition;
    filter ? condition[Object.keys(filter)[0]] = Object.values(filter)[0] : null

    let objForLog = {
        name: "find",
        description: "find finish products in module",
        filter: condition
    }
    logToFile(objForLog)

    try {
        const response = await getData(`/read/readMany/${SQL_FINISH_PRODUCTS_TABLE}`, condition)

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

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
