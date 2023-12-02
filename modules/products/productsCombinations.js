require('dotenv').config();
const { postData, getData, putData } = require('../../services/axios');
const { PRODUCTS_COMBINATION_ENTITY } = process.env



async function insertRow(object) {
    try {
        console.log({object})
        const existResponse = await getData(`/read/readMany/${PRODUCTS_COMBINATION_ENTITY}`, { AND: [{ parentId: object.parent }, { childId: object.child }] })
        if (existResponse.data.length > 0) {
            if (existResponse.data[0].Disabled) {
                let rowId = existResponse.data[0].Id

                let updateObject = {
                    entityName: PRODUCTS_COMBINATION_ENTITY,
                    values: { Disable: 'false' },
                    condition: { Id: rowId }
                }
                const updateResponse = await putData('/update/updateone', updateObject)
                return updateResponse
            }
            else
                throw new Error('already exist')
        }
        else {
            const response = await postData('/create/createone', { entityName: PRODUCTS_COMBINATION_ENTITY, values: { parentId: object.parent, childId: object.child, disabled: object.disabled } })
            return response
        }
    }
    catch (error) {
        throw error;
    }
}

async function getAll() {
    try {
        const response = await getData(`/read/readMany/${PRODUCTS_COMBINATION_ENTITY}`)
        if (response.status == 200)
            return response.data
        else
            return false
    }
    catch (error) {
        throw error
    }
}

async function deleteItem(object) {
    try {
        const response = await deleteData('/delete/deleteone', { entityName: PRODUCTS_COMBINATION_ENTITY, values: { Disable: true }, condition: { Id: object.Id } })
        if (response.status == 204) {
            return response.data
        }
        return false
    }
    catch (error) {
        throw error
    }
}

async function updateNames(object) {
    try {
        const response = await putData('/update/updateone', { entityName: PRODUCTS_COMBINATION_ENTITY, values: { parentId: object.parent, childId: object.child, disable: object.disable }, condition: { ParentId: object.idP, ChildId: object.idC }})
        if (response.status == 204)
            return response.data
        return false

    } catch (error) {
        throw error;
    }
}

module.exports = { insertRow, getAll, updateNames, deleteItem }