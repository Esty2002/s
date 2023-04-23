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
async function findPump(project = [], filter = {}) {
    return await sql_operations.find(project.join(','), filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "")
}
async function updatePump(obj, filter) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`

    }
    string = string.slice(0, -1)
    return await sql_operations.update(string, filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "")
}

module.exports = { updatePump, insertPump, findPump }