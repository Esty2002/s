const { postData, getData, putData } = require('../../services/axios');
const { modelNames } = require('../utils/schemas');



async function insert(object) {
    try {
        console.log({object})
        const existResponse = await getData(`/read/readMany/${modelNames.PRODUCTS_COMBINATIONS}`, { AND: [{ parentId: object.parent }, { childId: object.child }] })
        if (existResponse.data.length > 0) {
            if (existResponse.data[0].Disabled) {
                let rowId = existResponse.data[0].id

                let updateObject = {
                    entityName: modelNames.PRODUCTS_COMBINATIONS,
                    values: { disabled: 'false' },
                    condition: { id: rowId }
                }
                const updateResponse = await putData('/update/updateone', updateObject)
                return updateResponse
            }
            else
                throw new Error('already exist')
        }
        else {
            const response = await postData('/create/createone', { entityName: modelNames.PRODUCTS_COMBINATIONS, values: { parentId: object.parent, childId: object.child, disabled: object.disabled } })
            return response
        }
    }
    catch (error) {
        throw error;
    }
}

async function getAll() {
    try {
        const response = await getData(`/read/readMany/${modelNames.PRODUCTS_COMBINATIONS}`)
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
        const response = await deleteData('/delete/deleteone', { entityName: modelNames.PRODUCTS_COMBINATIONS, values: { Disable: true }, condition: { Id: object.Id } })
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
        const response = await putData('/update/updateone', { entityName: modelNames.PRODUCTS_COMBINATIONS, values: { parentId: object.parent, childId: object.child, disable: object.disable }, condition: { ParentId: object.idP, ChildId: object.idC }})
        if (response.status == 204)
            return response.data
        return false

    } catch (error) {
        throw error;
    }
}

module.exports = { insert, getAll, updateNames, deleteItem }