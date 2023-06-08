require('dotenv').config()
const { postData, sqlServer, getData } = require('../../services/axios')

const { SQL_UNIT_OF_MEASURE_TABLE } = process.env

async function updateMeasure(condition, obj) {
    return (await postData(sqlServer, '/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` })).data
}

async function insertMeasure(name) {
    return (await postData(sqlServer, '/create/create', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: name } })).data
}

async function findMeasureNumber(name) {
    return (await getData(sqlServer, `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/measure ='${name}'`)).data[0].id
}
async function findMeasureName(num) {
    console.log(num,'num');

    return (await getData(sqlServer, `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/id ='${num}'`)).data[0].measure
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure }                