require('dotenv').config()
const { postData, getData } = require('../../services/axios')

const { SQL_UNIT_OF_MEASURE_TABLE } = process.env

async function updateMeasure(condition, obj) {
    return (await postData('/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` }))
}

async function insertMeasure(name) {
    const exist = await getData(`/read/exist/${SQL_UNIT_OF_MEASURE_TABLE}/measure/${name}`)
    console.log('after exist');
    const { status, data } = exist
    console.log({ status, data });
    console.log(!data, '!');
    if (status === 200 && !data[0]) {
        console.log({ name });
        const response = await postData('/create/create', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { Measure: name, Disable: 0 } })
        console.log(response + 'hjhfdefjhg');
        return response
    }
    else {
        throw new Error(`data exist`)
    }
}

async function findMeasureNumber(name) {
    let a = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/Measure ='${name}'`)
    return a.data[0]
}
async function findMeasureName(num) {

    const measure = (await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/Id=${num}`))
    return measure
}

async function getAll() {
    const response = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}`)
    return response
}

async function deleteItem(object) {
    const response = await postData('/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { Disable: true }, condition: { Id: object.Id } })
    return response
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure, getAll, deleteItem }                