// require('dotenv').config()
// <<<<<<< HEAD
// const { postData } = require("../../services/axios");
// =======
// const { getData,   postData } = require("../../services/axios");
// >>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
// const { SQL_ADDITIONS_TABLE } = process.env
// const { findMeasureName } = require('./measure')

// async function insertAddition(obj) {
// <<<<<<< HEAD
//     obj.enabled = true
//     obj.addedDate = new Date().toISOString()
//     const response = await postData('/create/create', { tableName: SQL_ADDITIONS_TABLE, values: obj })
//     if (response.status === 201)
//         return true
//     else
//         return false
// }

// async function findAddition(project = [], filter = {}) {
//     if (!Object.keys(filter).includes('Enabled'))
//         filter['Enabled'] = 1

//     let columnsStr = project.length > 0 ? project.join(',') : '*'

//     let conditionStr = Object.entries(filter).map(f => `${f[0]}='${f[1]}'`).join(' ')
//     if (conditionStr.trim() == '')
//         conditionStr = "1=1"

//     const response = await postData("/read/readTopN", { tableName: SQL_ADDITIONS_TABLE, columns: columnsStr, condition: conditionStr })
//     if(response.status===200)
//         return response.data
    
//     else {
//         return false
//     }
// }

async function updateAddition(obj = {}, filter = {}) {
    const response = await postData('/update/update', { tableName: SQL_ADDITIONS_TABLE, values: obj.data, condition: obj.condition })
    if (response.data)
        return true
    else
        return false
}

module.exports = { updateAddition }
