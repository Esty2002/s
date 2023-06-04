require('dotenv').config()
const { getData, sqlServer, postData } = require("../../services/axios");
const { SQL_ADDITIONS_TABLE } = process.env
const { findMeasureNumber } = require('./measure')

async function insertAddition(obj) {
    // obj['ordinalNumber'] = (await postData(sqlServer, '/read/countRows', { tableName: SQL_ADDITIONS_TABLE })).data.returnValue + 1
    obj['addedDate'] = new Date().toISOString()
    obj['enabled'] = 1
    obj['unitOfMeasure'] = (await findMeasureNumber(obj['unitOfMeasure']))
    console.log(obj);
    return (await postData(sqlServer, '/create/create', { tableName: SQL_ADDITIONS_TABLE, values: obj })).data
}

async function findAddition(project = [], filter = {}) {
    filter['enabled'] = 1
    return (await postData(sqlServer, `/read/readTopN`, { tableName: SQL_ADDITIONS_TABLE, columns: project.length>0?project.join(','):'*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
}

async function updateAddition(obj = {}, filter = {}) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return (await postData(sqlServer, '/update/update', { tableName: SQL_ADDITIONS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
}

module.exports = { insertAddition, findAddition, updateAddition }
