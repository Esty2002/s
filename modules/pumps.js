const {SQLoperations } = require('../services/db/sql/sql_operation')
const sql_operations = new SQLoperations()
const table='pumps'
async function insertPumps(obj) {
    return sql_operations.insertOne(obj)
}
async function insertMeasure(obj) {
    return sql_operations.insertOne(obj)
}
async function findPumpst(attribute, value) {
    return sql_operations.findItem(`select  * from ${table} where ${attribute}=${value}`)
}
async function updateRecord(attribute, value = {}) {
    return sql_operations.findItem(`select  * from ${table} where ${attribute}='${value}'`)
}
module.exports = { insertPumps, findPumpst, updateRecord }