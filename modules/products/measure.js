require('dotenv').config()
<<<<<<< HEAD
const { postData, getData } = require('../../services/axios')
=======
const { postData,   getData } = require('../../services/axios')
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741

const { SQL_UNIT_OF_MEASURE_TABLE } = process.env

async function updateMeasure(condition, obj) {
<<<<<<< HEAD
    return (await postData('/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` }))
}

async function insertMeasure(name) {
    const exist = await getData(`/read/exist/${SQL_UNIT_OF_MEASURE_TABLE}/measure/${name}`)
    console.log(exist.data, '---------------------------------')

    const { status, data } = exist
    if (status == 200)
        if (exist.data.length == 0) {

            const response = await postData('/create/create', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: name, disable: false } })
            return response


        }
        else {

            if (data[0].Disable) {
                const response = await postData('/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { disable: false }, condition:`id = ${data[0].Id}` })
                return response
            }
            else{

                throw new Error(`data exist`)
            }
        }




}

async function findMeasureNumber(name) {
    let a = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/measure ='${name}'`)
    return a.data[0].id
=======
    return (await postData(  '/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: obj }, condition: `measure = '${condition}'` })).data
}

async function insertMeasure(name) {
    const response =  await postData(  '/create/create', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { measure: name } })
    return response
}

async function findMeasureNumber(name) {
     let a=await getData(  `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/measure ='${name}'`)
     return a.data[0].id
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
}
async function findMeasureName(num) {
    const measure = (await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/id =${num}`))
    console.log({ measure })
    return measure
}

<<<<<<< HEAD
async function getAll() {
    const response = await getData(`/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}`)
    return response
}

async function deleteItem(object) {
    const response = await postData('/update/update', { tableName: SQL_UNIT_OF_MEASURE_TABLE, values: { Disable: true }, condition: `Id=${object.Id}` })
    return response
=======
    return (await getData(  `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}/id ='${num}'`)).data[0].measure
}

async function getAll(){
    const response = await getData(  `/read/readAll/${SQL_UNIT_OF_MEASURE_TABLE}`)
    return response.data
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
}

module.exports = { updateMeasure, findMeasureNumber, findMeasureName, insertMeasure, getAll, deleteItem }                