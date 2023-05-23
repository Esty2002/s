const { sqlOperations } = require('../../services-products/db/sql/sql_operation')
<<<<<<< HEAD
const { postData, sqlServer } = require('../../services/axios')
=======
>>>>>>> Racheli
const { findMeasureNumber } = require('./measure')

// const sql_operations = new sqlOperations("PUMPS")
const { SQL_PUMPS_TABLE } = process.env


async function insertPump(obj) {
    let temp = await findMeasureNumber(obj['measure'])
    obj['measure'] = temp[0].id
    for (let k in obj) {
        obj[k] = "'" + obj[k] + "'"
    }
<<<<<<< HEAD
    return await postData(sqlServer, "craete/create", { tableName: SQL_PUMPS_TABLE, values: obj })
    // return await sql_operations.insert(obj)
    // postData()
=======
    return await sql_operations.insert(obj)
>>>>>>> Racheli
}
async function findPump(project = [], filter = {}) {
    return await postData(sqlServer, "read/readTop20", { tableName: SQL_PUMPS_TABLE, columns: project.join(','), condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
    // return await sql_operations.find(project.join(','), filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "")
}
async function updatePump(obj, filter) {
    let string = ""
    for (let k in obj) {
        string += `${k}='${obj[k]}',`
    }
    string = string.slice(0, -1)
    return await postData(sqlServer, 'update/update', { tableName: SQL_PUMPS_TABLE, values: obj, condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })
    // return await sql_operations.update(string, filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "")
}

module.exports = { updatePump, insertPump, findPump }