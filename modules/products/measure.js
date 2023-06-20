require('dotenv').config()
const { postData,  getData } = require('../../services/axios')

const { SQL_UNIT_OF_MEASURE_TABLE } = process.env

async function updateMeasure(condition, obj) {
    return (await postData( '/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` })).data
}

async function insertMeasure(name) {
    const response =  await postData('/create/create', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: name } })
    return response
}

async function findMeasureNumber(name) {
     let a=await getData( `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/measure ='${name}'`)
     return a.data[0].id
}
async function findMeasureName(num) {
const measure =(await getData( `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/id ='${num}'`)).data[0].Measure 
console.log({measure})
    return measure
}

async function getAll(){
    const response = await getData( `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}`)
    return response.data
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure, getAll }                