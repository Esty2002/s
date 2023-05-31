require('dotenv').config()
const { postData, sqlServer, getData } = require('../../services/axios')

const { SQL_UNIT_OF_MEASURE_TABLE } = process.env

async function updateMeasure(condition, obj) {
    return await postData(sqlServer, '/read/readTop20', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` })
}

async function insertMeasure(name) {
    return await postData(sqlServer, '/create/create', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { name: name } })
}

async function findMeasureNumber(name) {
    return await getData(sqlServer, `/read/readAll/unitOfMeasure/measure ='${name}'`)
}
async function findMeasureName(num) {
    return await getData(sqlServer, `/read/readAll/unitOfMeasure/id ='${num}'`)
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure }                