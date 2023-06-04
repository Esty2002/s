require('dotenv').config()
const { postData, sqlServer } = require('../../services/axios')
const { findMeasureNumber } = require('./measure')

const { SQL_PUMPS_TABLE } = process.env

async function insertPump(obj) {
    obj['unitOfMeasure'] = (await findMeasureNumber(obj['unitOfMeasure'])).data[0].id
    obj['addedDate'] = new Date().toISOString()
    obj['enabled'] = 1
    obj['addition'] = obj['addition'] ? 1 : 0
    console.log({ obj });
    // for (let k in obj) {
    //     obj[k] = "'" + obj[k] + "'"
    // }
    return (await postData(sqlServer, "/create/create", { tableName: SQL_PUMPS_TABLE, values: obj })).data
}

async function findPump(project = [], filter = {}) {
    filter['enabled'] = 1
    return (await postData(sqlServer, "/read/readTopN", { tableName: SQL_PUMPS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
}

async function updatePump(obj, filter) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return (await postData(sqlServer, 'update/update', { tableName: SQL_PUMPS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
}

module.exports = { updatePump, insertPump, findPump }