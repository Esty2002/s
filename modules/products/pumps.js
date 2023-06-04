require('dotenv').config()
const { postData, sqlServer } = require('../../services/axios')
const { findMeasureNumber } = require('./measure')

const { SQL_PUMPS_TABLE } = process.env

async function insertPump(obj) {
    obj['unitOfMeasure'] = (await findMeasureNumber(obj['unitOfMeasure'])).data[0].id
    obj['addedDate'] = new Date().toISOString().slice(0,new Date().toISOString().indexOf('T'))
    obj['enabled'] = 1
    // for (let k in obj) {
    //     obj[k] = "'" + obj[k] + "'"
    // }
    const result=await postData(sqlServer, "/create/create", { tableName: SQL_PUMPS_TABLE, values: obj })
    return result
}

async function findPump(project = [], filter = {}) {
    return await postData(sqlServer, "read/readTop20", { tableName: SQL_PUMPS_TABLE, columns: project.join(','), condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
}

async function updatePump(obj, filter) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return await postData(sqlServer, 'update/update', { tableName: SQL_PUMPS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
}

module.exports = { updatePump, insertPump, findPump }