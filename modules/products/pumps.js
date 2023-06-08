require('dotenv').config()
const { postData, sqlServer } = require('../../services/axios')
const { findMeasureNumber, findMeasureName } = require('./measure')

const { SQL_PUMPS_TABLE } = process.env

async function insertPump(obj) {
    obj['unitOfMeasure'] = (await findMeasureNumber(obj['unitOfMeasure']))
    obj['addedDate'] = new Date().toISOString()
    obj['enabled'] = 1
    obj['addition'] = obj['addition'] ? 1 : 0
    // for (let k in obj) {
    //     obj[k] = "'" + obj[k] + "'"
    // }
    console.log(obj,'in insertPump');
    return (await postData(sqlServer, "/create/create", { tableName: SQL_PUMPS_TABLE, values: obj })).data
}

async function findPump(project = [], filter = {}) {
    filter['enabled'] = 1
    let answer = await postData(sqlServer, "/read/readTopN", { tableName: SQL_PUMPS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
    answer=answer.data
    
    console.log(answer,'llll');
    for (const pump of answer) {
        if (Object.keys(pump).includes('unitOfMeasure')){
            pump['unitOfMeasure'] = await findMeasureName(pump['unitOfMeasure'])
        }
        console.log(pump['unitOfMeasure'],'{answer})');
    }

    return answer[0]
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