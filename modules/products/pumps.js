require('dotenv').config()
<<<<<<< HEAD
const { postData, getData} = require('../../services/axios')
const { findMeasureName } = require('./measure')
=======
const { postData,   } = require('../../services/axios')
const { findMeasureNumber, findMeasureName } = require('./measure')
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741

const { SQL_PUMPS_TABLE } = process.env

async function insertPump(obj) {
<<<<<<< HEAD
    obj.enabled = true
    obj.addedDate = new Date().toISOString()
    // obj.addition = obj.Addition ? 1 : 0

    const response = await postData('/create/create', { tableName: SQL_PUMPS_TABLE, values: obj })
    if (response.status === 201)
        return true
    else
        return false

}

async function findPump(project = [], filter = {}) {
    if (!Object.keys(filter).includes('Enabled'))
        filter['Enabled'] = 1

    let columnsStr = project.length > 0 ? project.join(',') : '*'

    let conditionStr = Object.entries(filter).map(f => `${f[0]}='${f[1]}'`).join(' AND ')
    if (conditionStr.trim() == '')
        conditionStr = "1=1"
    try {
        const response = await postData("/read/readTopN", { tableName: SQL_PUMPS_TABLE, columns: columnsStr, condition: conditionStr })
        console.log({ response }, 'in find');
        return response
    }
    catch (error) {
        throw error
=======
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
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
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

<<<<<<< HEAD

async function findPumpName(num) {
    console.log({num})
    const pump = await getData(`/read/readAll/${SQL_PUMPS_TABLE}/id =${num}`)
    console.log({ pump })
    return pump
=======
async function updatePump(obj, filter) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return (await postData(  'update/update', { tableName: SQL_PUMPS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
}


module.exports = { updatePump, insertPump, findPump, findPumpName }