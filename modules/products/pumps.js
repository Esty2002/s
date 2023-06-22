require('dotenv').config()
const { postData } = require('../../services/axios')
const { findMeasureName } = require('./measure')

const { SQL_PUMPS_TABLE } = process.env

async function insertPump(obj) {
    obj.enabled = true
    obj.addedDate = new Date().toISOString()
    // obj.addition = obj.Addition ? 1 : 0

    const response = await postData('/create/create', { tableName: SQL_PUMPS_TABLE, values: obj })
    if (response.data.Id)
        return true
    else
        return false

    // // obj['unitOfMeasure'] = (await findMeasureNumber(obj['unitOfMeasure']))
    // obj['AddedDate'] = new Date().toISOString()
    // obj['Enabled'] = 1
    // // for (let k in obj) {
    // //     obj[k] = "'" + obj[k] + "'"
    // // }
    // console.log(obj, 'in insertPump');
    // return (await postData("/create/create", { tableName: SQL_PUMPS_TABLE, values: obj })).data
}

async function findPump(project = [], filter = {}) {
    if (!Object.keys(filter).includes('Enabled'))
        filter['Enabled'] = 1

    let columnsStr = project.length > 0 ? project.join(',') : '*'

    let conditionStr = Object.entries(filter).map(f => `${f[0]}='${f[1]}'`).join(' ')
    if (conditionStr.trim() == '')
        conditionStr = "1=1"

    const response = await postData("/read/readTopN", { tableName: SQL_PUMPS_TABLE, columns: columnsStr, condition: conditionStr })
    console.log({ response }, 'in find');
    if (response.data.length > 0) {
        for (const finish of response.data) {
            if (Object.keys(finish).includes('UnitOfMeasure')) {
                finish.UnitOfMeasure = await findMeasureName(finish['UnitOfMeasure'])
            }
        }
        return response.data
    }
    else {
        return false
    }
}

async function updatePump(obj) {
    let conditionStr = obj.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : ""
    console.log({obj});
    console.log({conditionStr});
    const response = await postData('/update/update', { tableName: SQL_PUMPS_TABLE, values: obj.data, condition: conditionStr })
    console.log(response, 'in delete function');
    if (response.data)
        return true
    else
        return false
}


module.exports = { updatePump, insertPump, findPump }