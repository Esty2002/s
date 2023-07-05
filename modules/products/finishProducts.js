require('dotenv').config()
<<<<<<< HEAD
const { getData, postData } = require('../../services/axios')
=======
const {   getData, postData } = require('../../services/axios')
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')

async function insertFinishProduct(obj) {
<<<<<<< HEAD
    obj.enabled = true
    obj.addedDate = new Date().toISOString()
    const response = await postData('/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
    if(response.status === 201){
=======
    // const measure = await findMeasureNumber(obj['unitOfMeasure'])
    // obj['unitOfMeasure'] = measure
    // obj['ordinalNumber'] = await (getData( , '/')) + 1
    obj.enabled = true
    obj.addedDate = new Date().toISOString()
    const response = await postData( '/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
    if (response.data.rowsAffected[0] === 1)
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
        return true
    }
    else{
        return false
    }
}

async function updateFinishProduct(obj) {
<<<<<<< HEAD
    let conditionStr = obj.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : ""
    const response = await postData('/update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj.data, condition: conditionStr })
    console.log(response, 'in delete function');
    if (response.data)
=======
    // console.log('upFiPr');
    // let string = ""
    // for (let k in data.update) {
    //     string += `${k}='${data.update[k]}',`
    // }
    // string = string.slice(0, -1)
    let conditionStr= data.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : "" 
    const response = await postData(  '/update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj.data,condition:conditionStr })
    if(response.data)
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
        return true
    else
        return false
}

async function findFinishProduct(project = [], filter = {}) {
    if (!Object.keys(filter).includes('Enabled'))
        filter['Enabled'] = 1

    let columnsStr = project.length > 0 ? project.join(',') : '*'
<<<<<<< HEAD

    let conditionStr = Object.entries(filter).map(f => `${f[0]}='${f[1]}'`).join(' ')
    if (conditionStr.trim() == '')
        conditionStr = "1=1"

    const response = await postData("/read/readTopN", { tableName: SQL_FINISH_PRODUCTS_TABLE, columns: columnsStr, condition: conditionStr })
    console.log({ response }, 'in find');
    if (response.status === 200)
        return response.data
=======
    let conditionStr=filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" 
    const response = await postData(  "/read/readTopN", { tableName: SQL_FINISH_PRODUCTS_TABLE, columns: columnsStr, condition: conditionStr})
    if(response){
        for (const finish of response) {
            if (Object.keys(finish).includes('unitOfMeasure')) {
                finish.unitOfMeasure = await findMeasureName(finish['unitOfMeasure'])
            }
        }
        return response
    }
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    else
        return false
    // else{
    //     return false
    // }
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
