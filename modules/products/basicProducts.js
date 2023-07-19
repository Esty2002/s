require('dotenv').config()
const { postData } = require('../../services/axios')
const { SQL_PRODUCTS_TABLE } = process.env

async function getTraits(project = [], filter = {}) {
    const response = await postData( '/read/readTopN',  
    { entityName: SQL_PRODUCTS_TABLE, columns: project.length>0 ? project.join(',') : '*', condition: Object.keys(filter).length > 0 ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "1=1" })
    return response.data
}

module.exports = { getTraits }
