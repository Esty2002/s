require('dotenv').config()
const { postData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { logToFile } = require('../../services/logger/logTxt')

const values = [
    {
        entity: "FinishProducts",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, AddedDate=null,Enabled=null,DeleteDate=null,}) => {
            return {
                tableName: "FinishProducts",
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

async function insertFinishProduct(obj, tableName) {
    let objectForLog = {
        name: 'create',
        description: 'insert  finished product in module',
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
        const response = await postData('/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
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
    
    const response = await postData('/update/update', { entityName: SQL_FINISH_PRODUCTS_TABLE, values: obj.data, condition: obj.condition })
    if (response.data)
        return true
    else
        return false
}

async function findFinishProduct(project = [], filter = {},tableName) {
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
        description: "find finish products in module",
        filter: conditionStr,
        project: columnsStr
    }
    logToFile(objForLog)

    const response = await postData("/read/readTopN", { entityName: SQL_FINISH_PRODUCTS_TABLE, columns: columnsStr, condition: conditionStr })
    if (response.status === 200)
        return response.data
    else
        return false
    // else{
    //     return false
    // }
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
