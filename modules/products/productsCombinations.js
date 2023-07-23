require('dotenv').config();
const { postData, getData } = require('../../services/axios');
const { SQL_PRODUCTS_COMBINATIONS_TABLE } = process.env



async function insertRow(object) {
    const existResponse = await postData('/read/readTopN', { entityName: SQL_PRODUCTS_COMBINATIONS_TABLE, columns: '*', condition: `parentId= ${object.parent} and  childId = ${object.child}` })
    if (existResponse.data.length > 0) {
        if (existResponse.data[0].Disable) {
            let rowId = existResponse.data[0].Id
            let updateObject = {
                "entityName": SQL_PRODUCTS_COMBINATIONS_TABLE,
                "condition": `Id=${rowId}`,
                "values": {Disable:'false'}
            }
            console.log({updateObject})
            const updateResponse = await postData('/update/update', updateObject)
            return updateResponse
        }
        else
            throw new Error('already exist')
    }
    else {
        const response = await postData('/create/createone', { entityName: SQL_PRODUCTS_COMBINATIONS_TABLE, values: { parentId: object.parent, childId: object.child, disable: object.disable } })

        return response
    }
}

async function getAll() {
    const response = await getData(`/read/readAll/${SQL_PRODUCTS_COMBINATIONS_TABLE}`)
    return response.data
}

async function deleteItem(object) {
    const response = await postData('/update/update', { entityName: SQL_PRODUCTS_COMBINATIONS_TABLE, values: { Disable: true }, condition: {Id:object.Id} })
    return response
}

async function updateNames(object) {

    const response = await postData('/update/update', { entityName: SQL_PRODUCTS_COMBINATIONS_TABLE, values: { parentId: object.parent, childId: object.child, disable: object.disable }, condition: {ParentId:object.idP, ChildId:object.idC} })
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



module.exports = { insertRow, getAll, updateNames, deleteItem }