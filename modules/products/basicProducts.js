// require('dotenv').config()
// <<<<<<< HEAD
// const { postData } = require('../../services/axios')
// const { SQL_PRODUCTS_TABLE } = process.env

async function getTraits(project = [], filter = {}) {
    const response = await postData( '/read/readTopN',  
    { entityName: SQL_PRODUCTS_TABLE, columns: project.length>0 ? project.join(',') : '*', condition: Object.keys(filter).length > 0 ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "1=1" })
    return response.data
}

// async function getTraits(project = [], filter = {}) {
//     const response = await postData(  '/read/readTopN',  
// >>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
//     { tableName: SQL_PRODUCTS_TABLE, columns: project.length>0 ? project.join(',') : '*', condition: Object.keys(filter).length > 0 ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "1=1" })
//     return response.data
// }

// module.exports = { getTraits }
