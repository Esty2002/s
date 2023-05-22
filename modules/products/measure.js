const { sqlOperations } = require('../../services-products/db/sql/sql_operation')
const { postData, sqlServer, getData } = require('../../services/axios')

// const sql_operations = new sqlOperations("unitOfMeasure")
const {SQL_UNIT_OF_MEASURE_TABLE}=process.env

async function updateMeasure(condition, obj) {
    return await postData(sqlServer, '/read/readTop20', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` })
    // return await sql_operations.update(`measure = '${obj}'`,`measure = '${condition}'`)
}

async function insertMeasure(name) {
    return await postData(sqlServer,'/create/create',{tableName:SQL_UNIT_OF_MEASURE_TABLE,values:{name:name}})
    // return sql_operations.insert({ name: "'" + name + "'" })
}

async function findMeasureNumber(name) {
    return await getData(sqlServer,`/read/readAll/unitOfMeasure/measure ='${name}'`)
    // return sql_operations.find('id', ` measure ='${name}'`)
}
async function findMeasureName(num) {
    return await getData(sqlServer,`/read/readAll/unitOfMeasure/measure ='${num}'`)
    // return sql_operations.find('measure', ` id ='${num}'`)
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure }                