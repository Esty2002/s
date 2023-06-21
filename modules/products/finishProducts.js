require('dotenv').config()
const { getData, postData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')

async function insertFinishProduct(obj) {
    obj.enabled = true
    obj.addedDate = new Date().toISOString()
    const response = await postData('/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
    if (response.data.Id)
        return true
    else
        return false
}

async function updateFinishProduct(obj) {
    let conditionStr = data.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : ""
    const response = await postData('/update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj.data, condition: conditionStr })
    if (response.data)
        return true
    else
        return false

}

async function findFinishProduct(project = [], filter = {}) {
    let columnsStr = project.length > 0 ? project.join(',') : '*'

    let conditionStr = Object.entries(filter).map(f => `${f[0]}='${f[1]}'`).join(' ')
    if (conditionStr.trim() == '') {
        conditionStr = "1=1"
    }
    const response = await postData("/read/readTopN", { tableName: SQL_FINISH_PRODUCTS_TABLE, columns: columnsStr, condition: conditionStr })
    if (response.data.length>0) {
        for (const finish of response.data) {
            console.log({finish})
            if (Object.keys(finish).includes('UnitOfMeasure')) {
                finish.UnitOfMeasure = await findMeasureName(finish['UnitOfMeasure'])
                console.log({finish})
            }
        }
        return response.data
    }
    else
        return response.data
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
