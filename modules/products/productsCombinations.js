require('dotenv').config();
const { postData,  getData } = require('../../services/axios');
const { SQL_PRODUCTS_COMBINATIONS_TABLE } = process.env



async function insertRow(object) {
    const response = await postData( '/create/create', { tableName: SQL_PRODUCTS_COMBINATIONS_TABLE, values: { parentId: object.parent, childId: object.child } })
    return response
}

async function getAll() {
    const response = await getData( `/read/readAll/${SQL_PRODUCTS_COMBINATIONS_TABLE}`)
    return response.data
}

// async function getChildrenByParent(parent) {
//     const response = await getData(sqlServer, `/read/readAll/${SQL_PRODUCTS_COMBINATIONS_TABLE}/parentId=${parent}`)
//     return response.data
// }

// async function getParentByChild(child) {
//     const response = await getData(sqlServer, `/read/readAll/${SQL_PRODUCTS_COMBINATIONS_TABLE}/childId=${child}`)
//     return response.data
// }

module.exports = { insertRow, getAll }