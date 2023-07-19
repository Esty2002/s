require('dotenv').config()
const { postData } = require("../../services/axios");
const { SQL_ADDITIONS_TABLE } = process.env
const { findMeasureName } = require('./measure')

async function insertAddition(obj) {
    obj.enabled = true
    obj.addedDate = new Date().toISOString()
    const response = await postData('/create/createone', { entityName: SQL_ADDITIONS_TABLE, values: obj })
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

    const response = await postData("/read/readTopN", { entityName: SQL_ADDITIONS_TABLE, columns: columnsStr, condition: conditionStr })
    if(response.status===200)
        return response.data
    
    else {
        return false
    }
}

async function updateAddition(obj = {}, filter = {}) {
    const response = await postData('/update/update', { entityName: SQL_ADDITIONS_TABLE, values: obj.data, condition: obj.condition })
    if (response.data)
        return true
    else
        return false
}

module.exports = { insertAddition, findAddition, updateAddition }
