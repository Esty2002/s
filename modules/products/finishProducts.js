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
    let conditionStr = obj.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : ""
    const response = await postData('/update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj.data, condition: conditionStr })
    console.log(response,'in delete function');
    if (response.data)
        return true
    else
        return false
}

async function findFinishProduct(project = [], filter = {}) {
    if (!Object.keys(filter).includes('Enabled'))
        filter['Enabled'] = 1

    let columnsStr = project.length > 0 ? project.join(',') : '*'

    let conditionStr = Object.entries(filter).map(f => `${f[0]}='${f[1]}'`).join(' ')
    if (conditionStr.trim() == '') 
        conditionStr = "1=1"
    
    const response = await postData("/read/readTopN", { tableName: SQL_FINISH_PRODUCTS_TABLE, columns: columnsStr, condition: conditionStr })
    console.log({response},'in find');
    if (response.data.length>0) {
        for (const finish of response.data) {
            if (Object.keys(finish).includes('UnitOfMeasure')) {
                finish.UnitOfMeasure = await findMeasureName(finish['UnitOfMeasure'])
            }
        }
        return response.data
    }
    else{
        return false
    }
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
