require('dotenv').config()
const { sqlServer, getData, postData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env

async function insertFinishProduct(obj) {
    obj['enable'] = true
    obj['ordinalNumber'] = await (getData(sqlServer, '/')) + 1
    obj['addedDate'] = new Date()
    return await postData(sqlServer, '/create/create', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
}

async function updateFinishProduct(condition, data) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return await postData(sqlServer, 'update/update', { tableName: SQL_FINISH_PRODUCTS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
}

async function findFinishProduct(project = [], filter = {}) {
    filter['enable'] = true
    return await postData(sqlServer, "read/readTop20", { tableName: SQL_ADDITIONS_TABLE, columns: project.join(','), condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
}

module.exports = { insertFinishProduct, updateFinishProduct, findFinishProduct }
