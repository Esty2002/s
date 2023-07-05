require('dotenv').config()
<<<<<<< HEAD
const { postData } = require("../../services/axios");
=======
const { getData,   postData } = require("../../services/axios");
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
const { SQL_ADDITIONS_TABLE } = process.env
const { findMeasureName } = require('./measure')

async function insertAddition(obj) {
<<<<<<< HEAD
    obj.enabled = true
    obj.addedDate = new Date().toISOString()
    const response = await postData('/create/create', { tableName: SQL_ADDITIONS_TABLE, values: obj })
    if (response.status === 201)
        return true
    else
        return false
}

async function findAddition(project = [], filter = {}) {
    if (!Object.keys(filter).includes('Enabled'))
        filter['Enabled'] = 1

    let columnsStr = project.length > 0 ? project.join(',') : '*'

    let conditionStr = Object.entries(filter).map(f => `${f[0]}='${f[1]}'`).join(' ')
    if (conditionStr.trim() == '')
        conditionStr = "1=1"

    const response = await postData("/read/readTopN", { tableName: SQL_ADDITIONS_TABLE, columns: columnsStr, condition: conditionStr })
    if(response.status===200)
        return response.data
    
    else {
        return false
=======
    // obj['ordinalNumber'] = (await postData( , '/read/countRows', { tableName: SQL_ADDITIONS_TABLE })).data.returnValue + 1
    obj['addedDate'] = new Date().toISOString()
    obj['enabled'] = 1
    // obj['addition'] = obj['addition'] ? 1 : 0
    console.log(obj);
    const response = await postData(  '/create/create', { tableName: SQL_ADDITIONS_TABLE, values: obj })

    return response.data
}

async function findAddition(project = [], filter = {}) {
    filter['enabled'] = 1
    let answer = (await postData(  `/read/readTopN`, { tableName: SQL_ADDITIONS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
    for (const add of answer) {
        if (Object.keys(add).includes('unitOfMeasure')) {
            add['unitOfMeasure'] = await findMeasureName(add['unitOfMeasure'])
        }
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    }
}

async function updateAddition(obj = {}, filter = {}) {
<<<<<<< HEAD
    let conditionStr = obj.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : ""
    const response = await postData('/update/update', { tableName: SQL_ADDITIONS_TABLE, values: obj.data, condition: conditionStr })
    if (response.data)
        return true
    else
        return false
=======
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return (await postData(  '/update/update', { tableName: SQL_ADDITIONS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
}

module.exports = { insertAddition, findAddition, updateAddition }
