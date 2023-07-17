require('dotenv').config()
const { postData,   } = require('../../services/axios')
const { findMeasureNumber, findMeasureName } = require('./measure')

const { SQL_PUMPS_TABLE } = process.env

async function insertPump(obj) {
    // obj['unitOfMeasure'] = (await findMeasureNumber(obj['unitOfMeasure']))
    obj['addedDate'] = new Date().toISOString()
    obj['enabled'] = 1
    obj['addition'] = obj['addition'] ? 1 : 0
    // for (let k in obj) {
    //     obj[k] = "'" + obj[k] + "'"
    // }
    console.log(obj, 'in insertPump');
    return (await postData(  "/create/create", { tableName: SQL_PUMPS_TABLE, values: obj })).data
}

async function findPump(project = [], filter = {}) {
    filter.enabled = 1
    const result = await postData(  "/read/readTopN", { tableName: SQL_PUMPS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
    let answer = result.data
    for (const pump of answer) {
        if (Object.keys(pump).includes('unitOfMeasure')) {
            pump['unitOfMeasure'] = await findMeasureName(pump['unitOfMeasure'])
        }
        console.log(pump['unitOfMeasure'], '{answer})');
    }
    // if (response.length > 0) {
    //     for (const finish of response) {
    //         if (Object.keys(finish).includes('UnitOfMeasure')) {
    //             finish.UnitOfMeasure = await findMeasureName(finish['UnitOfMeasure'])
    //         }
    //     }
    //     return response
    // }
    // else {
    //     return false
    // }
}

async function updatePump(obj) {
    let conditionStr = obj.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : ""
    console.log({ obj });
    console.log({ conditionStr });
    const response = await postData('/update/update', { tableName: SQL_PUMPS_TABLE, values: obj.data, condition: conditionStr })
    console.log(response, 'in delete function');
    if (response)
        return true
    else
        return false
}

async function updatePump(obj, filter) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return (await postData(  'update/update', { tableName: SQL_PUMPS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
}


module.exports = { updatePump, insertPump, findPump }