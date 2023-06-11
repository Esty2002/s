require('dotenv').config()
const { postData, sqlServer, getData } = require('../../services/axios')

const { SQL_UNIT_OF_MEASURE_TABLE } = process.env

async function updateMeasure(condition, obj) {
    return (await postData(sqlServer, '/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` })).data
}

async function insertMeasure(name) {
    const response =  await postData(sqlServer, '/create/create', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: name } })
    return response
}

async function findMeasureNumber(name) {
     let a=await getData(sqlServer, `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/measure ='${name}'`)
     return a.data[0].id
}
async function findMeasureName(num) {
    console.log(num,'num');

    return (await getData(sqlServer, `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/id ='${num}'`)).data[0].measure
}

async function getAll(){
    const response = await getData(sqlServer, `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}`)
    return response.data
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure, getAll }                