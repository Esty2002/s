require('dotenv').config()
const { getData, sqlServer, postData } = require("../../services/axios");
const { SQL_ADDITIONS_TABLE } = process.env
const { findMeasureNumber } = require('./measure')

async function insertAddition(obj) {
    // obj['ordinalNumber'] = await postData(sqlServer, '/read/countRows', { tableName: SQL_ADDITIONS_TABLE,condition:"1=1"}) + 1
    // console.log(obj['ordinalNumber']);
    obj['addedDate'] = new Date()
    obj['enabled'] = true
    obj['unitOfMeasure'] = (await findMeasureNumber(obj['unitOfMeasure'])).data[0].id
    // let response=await findMeasureNumber(obj['unitOfMeasure'])
    // console.log(response);
    console.log(obj['unitOfMeasure']);
    return await postData(sqlServer, '/create/create', { tableName: SQL_ADDITIONS_TABLE, values: obj })
}

async function findAddition(project = [], filter = {}) {
    filter['enable'] = true
    return await postData(sqlServer, "read/readTop20", { tableName: SQL_ADDITIONS_TABLE, columns: project.join(','), condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
}

async function updateAddition(obj = {}, filter = {}) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return await postData(sqlServer, 'update/update', { tableName: SQL_ADDITIONS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
}

module.exports = { insertAddition, findAddition, updateAddition }
