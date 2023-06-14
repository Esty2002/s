require('dotenv').config()
const { sqlServer, getData, postData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')

async function insertFinishProduct(obj) {
    obj.enabled = 1
    // const measure = await findMeasureNumber(obj['unitOfMeasure'])
    // obj['unitOfMeasure'] = measure
    // obj['ordinalNumber'] = await (getData(sqlServer, '/')) + 1
    obj.addedDate = new Date().toISOString()
    console.log(obj)
    const response = await postData(sqlServer, '/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
    if (response.data.rowsAffected[0] === 1)
        return true
    else
        return false
}

async function updateFinishProduct(data = {}, condition = {}) {
    console.log('upFiPr');
    let string = ""
    for (let k in data) {
        string += `${k}='${data[k]}',`
    }
    string = string.slice(0, -1)
    return (await postData(sqlServer, '/update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: data, condition: condition ? `${Object.keys(condition)[0]}='${Object.values(condition)[0]}'` : "" })).data
}

async function findFinishProduct(project = [], filter = {}) {
    filter['enabled'] = 1
    let answer = (await postData(sqlServer, "/read/readTopN", { tableName: SQL_FINISH_PRODUCTS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
    for (const finish of answer) {
        if (Object.keys(finish).includes('unitOfMeasure')) {
            finish['unitOfMeasure'] = await findMeasureName(finish['unitOfMeasure'])
        }
    }
    console.log(answer, 'aaaaaaaaaaaaa');
    return answer
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
