require('dotenv').config()
const { postData, sqlServer } = require('../../services/axios')
const { SQL_PRODUCTS_TABLE } = process.env

async function getTraits(project = [], filter = {}) {
    return (await postData(sqlServer, '/read/readTopN',  { tableName: SQL_PRODUCTS_TABLE, columns: project.length>0 ? project.join(',') : '*', condition: Object.keys(filter).length > 0 ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "1=1" })).data
}

module.exports = { getTraits }
