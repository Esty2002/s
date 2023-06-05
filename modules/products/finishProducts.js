require('dotenv').config()
const { sqlServer, getData, postData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber } = require('./measure')

async function insertFinishProduct(obj) {
    obj['enabled'] = 1
    obj['unitOfMeasure'] = (await findMeasureNumber(obj['unitOfMeasure'])).data[0].id
    // obj['ordinalNumber'] = await (getData(sqlServer, '/')) + 1
    obj['addedDate'] = new Date().toISOString().slice(0, new Date().toISOString().indexOf('T'))
    return (await postData(sqlServer, '/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })).data
}

async function updateFinishProduct(data = {}, condition = {}) {
    let string = ""
    for (let k in data) {
        string += `${k}='${data[k]}',`
    }
    string = string.slice(0, -1)
    return (await postData(sqlServer, 'update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: data, condition: condition ? `${Object.keys(condition)[0]}='${Object.values(condition)[0]}'` : "" })).data
}

async function findFinishProduct(project = [], filter = {}) {
    filter['enabled'] = 1
    return (await postData(sqlServer, "/read/readTopN", { tableName: SQL_FINISH_PRODUCTS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
