require('dotenv').config()
const { postData } = require('../../services/axios')
const { SQL_PRODUCTS_TABLE } = process.env

async function getTraits(project = [], filter = {}) {
    filter['enabled'] = true
    let obj = { tableName: SQL_PRODUCTS_TABLE, columns: project.join(','), condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" }
    return await postData('read/find', obj)

}

module.exports = { getTraits }
