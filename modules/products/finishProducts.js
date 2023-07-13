require('dotenv').config()
const { postData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { logToFile } = require('../../services/logger/logTxt')

const values = [
    {
        entity: "FinishProducts",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null }) => {
            return {
                tableName: "FinishProducts",
                values: {
                    Name: Name,
                    UnitOfMeasure: UnitOfMeasure,
                    BookkeepingCode: BookkeepingCode,
                    AddedDate: new Date().toISOString(),
                    Enabled: true,
                    DeleteDate: null,
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
    const { error } = measure
    if (error) {
        return error;
    }
    obj.UnitOfMeasure = measure
    try {
        const response = await postData('/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
        if (response.data)
            return true
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        throw error
    }
}

async function updateFinishProduct(obj) {
    // console.log('upFiPr');
    // let string = ""
    // for (let k in data.update) {
    //     string += `${k}='${data.update[k]}',`
    // }
    // string = string.slice(0, -1)
    let conditionStr = data.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : ""
    const response = await postData('/update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj.data, condition: conditionStr })
    if (response.data)
        return true
    else
        return false
}

async function findFinishProduct(project = [], filter = {}) {
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

    const response = await postData("/read/readTopN", { tableName: SQL_FINISH_PRODUCTS_TABLE, columns: columnsStr, condition: conditionStr })
    try {
        for (const finish of response.data) {
            if (Object.keys(finish).includes('UnitOfMeasure')) {
                const measureName = await findMeasureName(finish.UnitOfMeasure)
                const { error } = measureName
                if (error) 
                    return error;
                finish['UnitOfMeasure'] = measureName
            }
        }
        return response.data
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
