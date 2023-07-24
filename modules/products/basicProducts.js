require('dotenv').config()
const { getData } = require('../../services/axios')
const { SQL_PRODUCTS_TABLE } = process.env

<<<<<<< HEAD
async function getTraits(filter = {}) {
    try {
        let condition;
        Object.keys(filter).length > 0 ? condition[Object.keys(filter)[0]] = Object.values(filter)[0] : null
        const response = await getData(`/read/readMany/${SQL_PRODUCTS_TABLE}`, condition)
        return response
    }
    catch (error) {
        throw error;
    }
}
=======
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
>>>>>>> f5291c0209296599f25d5a979c5fd995441c5200

module.exports = { getTraits }
