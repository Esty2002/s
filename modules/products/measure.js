const  {sqlOperations}  = require('../../services-products/db/sql/sql_operation')


const sql_operations = new sqlOperations("unitOfMeasure")

async function updateMeasure(condition,obj){
    return await sql_operations.update(`measure = '${obj}'`,`measure = '${condition}'`)
}

async function insertMeasure(name) {
    return sql_operations.insert({name:"'"+name+"'"})
} 

async function findMeasureNumber(name) {
    return sql_operations.find('id',` measure ='${name}'`)
}
async function findMeasureName(num) {
    return sql_operations.find('measure',` id ='${num}'`)
}

module.exports={updateMeasure,findMeasureNumber,findMeasureName,insertMeasure}                