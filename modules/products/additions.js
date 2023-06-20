require('dotenv').config()
const { getData,  postData } = require("../../services/axios");
const { SQL_ADDITIONS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')

async function insertAddition(obj) {
    obj['addedDate'] = new Date().toISOString()
    obj['enabled'] = 1
    // obj['addition'] = obj['addition'] ? 1 : 0
    console.log(obj);
    const response = await postData( '/create/create', { tableName: SQL_ADDITIONS_TABLE, values: obj })

    return response.data
}

async function findAddition(project = [], filter = {}) {
    filter['enabled'] = 1
    let answer = (await postData( `/read/readTopN`, { tableName: SQL_ADDITIONS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
    for (const add of answer) {
        if (Object.keys(add).includes('unitOfMeasure')) {
            add['unitOfMeasure'] = await findMeasureName(add['unitOfMeasure'])
        }
    }
    return answer
}

async function updateAddition(obj = {}, filter = {}) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return (await postData( '/update/update', { tableName: SQL_ADDITIONS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
}

module.exports = { insertAddition, findAddition, updateAddition }
