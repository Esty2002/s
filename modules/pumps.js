const { sqlOperations } = require('../services/db/sql/sql_operation')
const { findMeasureNumber } = require('./measure')

const sql_operations = new sqlOperations("PUMPS")


async function insertPump(obj) {
    let temp = await findMeasureNumber(obj['measure'])
    obj['measure'] = temp[0].id
    for (let k in obj) {
        obj[k] = "'" + obj[k] + "'"
    }
    return await sql_operations.insert(obj)
}
async function findPump(project = [], filter = "") {
    let columns = ""
    if (project.length > 0) {
        for (let index = 0; index < project.length; index++) {

            columns += project[index] + ','
        }
        columns = columns.slice(0, -1)
    }
    let condition = ""
    if (filter) {
        condition = `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'`
    }

    return await sql_operations.find(columns, condition)
}
async function updatePump(obj, filter) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`

    }
    string = string.slice(0, -1)
    let condition = ""
    if (filter) {
        condition = ` ${Object.keys(filter)[0]}='${Object.values(filter)[0]}'`
    }
    return await sql_operations.update(string, condition)
}

module.exports = { updatePump, insertPump, findPump }