const { postData, getData, putData, deleteData } = require('../../services/axios');
const { checkObjectValidations } = require('../../services/validations/use-validations');
const { ModelStatusTypes } = require('../../utils/types');
const { modelNames } = require('../utils/schemas');



async function insert(object) {
    console.log({ object })
    try {
        const existResponse = await getData(`/read/readMany/${modelNames.PRODUCTS_COMBINATIONS}`, object)
        
        const isValid = await checkObjectValidations(object, modelNames.PRODUCTS_COMBINATIONS, ModelStatusTypes.UPDATE)
        if (existResponse.data.length > 0) {
            if (existResponse.data[0].disabled) {
                let id = existResponse.data[0].id

                let updateObject = {
                    entityName: modelNames.PRODUCTS_COMBINATIONS,
                    values: { disabled: false },
                    condition: { id }
                }
                const updateResponse = await putData('/update/updateone', updateObject)
                return updateResponse
            }
            else {
                throw new Error('resource exists')
            }
        }
        else {
            const isValid = await checkObjectValidations(object, modelNames.PRODUCTS_COMBINATIONS, ModelStatusTypes.CREATE)
            console.log({ object })
            const response = await postData('/create/createone', { entityName: modelNames.PRODUCTS_COMBINATIONS, values: object })
            return response
        }
    }
    catch (error) {
        throw error;
    }
}

async function getAll(condition={}) {
    try {
        const response = await getData(`/read/readMany/${modelNames.PRODUCTS_COMBINATIONS}`, condition)
        return response
    }
    catch (error) {
        throw error
    }
}

async function deleteItem(object) {
    try {
        _ = await checkObjectValidations(object, modelNames.PRODUCTS_COMBINATIONS, ModelStatusTypes.DELETE)
        console.log(object)
        const response = await deleteData('/delete/deleteone', { entityName: modelNames.PRODUCTS_COMBINATIONS, values: object, condition: { id: object.id } })
        return response
    }
    catch (error) {
        throw error
    }
}

async function updateNames(object) {
    try {
        const response = await putData('/update/updateone', { entityName: modelNames.PRODUCTS_COMBINATIONS, values: { parentId: object.parent, childId: object.child, disable: object.disable }, condition: { ParentId: object.idP, ChildId: object.idC } })
        if (response.status == 204)
            return response.data
        return false

    } catch (error) {
        throw error;
    }
}

module.exports = { insert, getAll, updateNames, deleteItem }