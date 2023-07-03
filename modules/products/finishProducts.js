require('dotenv').config()
const {   getData, postData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')

async function insertFinishProduct(obj) {
    // const measure = await findMeasureNumber(obj['unitOfMeasure'])
    // obj['unitOfMeasure'] = measure
    // obj['ordinalNumber'] = await (getData( , '/')) + 1
    obj.enabled = true
    obj.addedDate = new Date().toISOString()
    const response = await postData( '/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
    if (response.data.rowsAffected[0] === 1)
        return true
    else
        return false
}

async function updateFinishProduct(obj) {
    // console.log('upFiPr');
    // let string = ""
    // for (let k in data.update) {
    //     string += `${k}='${data.update[k]}',`
    // }
    // string = string.slice(0, -1)
    let conditionStr= data.condition ? `${Object.keys(obj.condition)[0]}='${Object.values(obj.condition)[0]}'` : "" 
    const response = await postData(  '/update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj.data,condition:conditionStr })
    if(response.data)
        return true
    else
        return false
    
}

async function findFinishProduct(project = [], filter = {}) {
   // filter.enabled = 1
    let columnsStr = project.length > 0 ? project.join(',') : '*'
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
    else
        return false
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
