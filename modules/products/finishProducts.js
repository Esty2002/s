require('dotenv').config()
const { getData, postData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')
const { checkObjectValidations } = require('../../services/validations/use-validations')

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
    const checkValidObj = values.find(({ entity }) => tableName === entity);
    let newObj = checkValidObj.func(obj)
    if (checkValidObj) {
        _= await checkObjectValidations(newObj.values, checkValidObj.entity)
        obj = newObj.values
    }
    const measure = await findMeasureNumber(obj['UnitOfMeasure'])
    const { error } = measure
    if (error)
        return error;
    obj.UnitOfMeasure = measure
    const response = await postData('/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
    if (response.data)
        return true
    return false
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
    const response = await postData("/read/readTopN", { tableName: SQL_FINISH_PRODUCTS_TABLE, columns: columnsStr, condition: conditionStr })
    if (response) {
        for (const finish of response.data)
            if (Object.keys(finish).includes('UnitOfMeasure'))
                finish.UnitOfMeasure = await findMeasureName(finish.UnitOfMeasure)
        return response.data
    }
    else
        return false
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
