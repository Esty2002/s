const { postData, getData, putData, deleteData } = require('../../services/axios');
const { checkObjectValidations } = require('../../services/validations/use-validations');
const { ModelStatusTypes, ErrorTypes } = require('../../utils/types');
const { isEmptyObject } = require('../utils/object-code');
const { modelNames, getModel, getModelKey, compareObjects } = require('../utils/schemas');



async function insert(object) {
    try {
        const existResponse = await getData(`/read/readMany/${modelNames.PUMPS_COMBINATIONS}`, object)

        if (existResponse.data.length > 0) {
            object = await checkObjectValidations(object, modelNames.PUMPS_COMBINATIONS, ModelStatusTypes.UPDATE)
            if (existResponse.data[0].disabled) {
                let id = existResponse.data[0].id

                let updateObject = {
                    data: { disabled: false },
                    condition: { id }
                }
                const updateResponse = await putData(`/update/updateone/${modelNames.PUMPS_COMBINATIONS}`, updateObject)
                return updateResponse
            }
            else {

               throw new Error('resource exists')
            }
        }
        else {
            object = await checkObjectValidations(object, modelNames.PUMPS_COMBINATIONS, ModelStatusTypes.CREATE)
            console.log({ object })
            const response = await postData(`/create/createone/${modelNames.PUMPS_COMBINATIONS}`, { data: object })
            return response
        }
    }
    catch (error) {
        console.log({ error })

        throw error;
    }
}

async function getAll(condition = {}) {
    try {
        const response = await getData(`/read/readMany/${modelNames.PUMPS_COMBINATIONS}`, condition)
        return response
    }
    catch (error) {
        throw error
    }
}

async function deleteItem({ data = {}, condition = {} }) {
    try {
        if (isEmptyObject(condition)) {
            if (isEmptyObject(data)) {
                const error = { type: ErrorTypes.VALIDATION }
                error.message = 'no object'
                throw error
            }
            else {
                const model = getModel(modelNames.PUMPS_COMBINATIONS)
                const modelKey = Object.values(model.fields).find(({ key }) => key)
                if (data[modelKey]) {
                    condition[modelKey] = data[modelKey]
                }
                else {

                }
            }
        }
        _ = await checkObjectValidations(condition, modelNames.PUMPS_COMBINATIONS, ModelStatusTypes.DELETE)
        const response = await deleteData(`/delete/deleteone/${modelNames.PUMPS_COMBINATIONS}`, { condition })
        return response
    }
    catch (error) {

        throw error
    }
}

async function updateNames({ data = {}, condition = {} }) {
    try {

        let origin;
        if (isEmptyObject(condition)) {
            const key = getModelKey(modelNames.PUMPS_COMBINATIONS);
            condition[key] = data[key]
            origin = await getData(`/read/readone/${modelNames.PUMPS_COMBINATIONS}/${data[key]}`)
        }
        else {
            origin = await getData(`/read/readMany/${modelNames.PUMPS_COMBINATIONS}`, condition)
        }
        if (origin.data) {
            const originObj = origin.data
            const updatedata = compareObjects({ data, origin: originObj, modelname: modelNames.PUMPS_COMBINATIONS })
            if (!isEmptyObject(updatedata)) {
                _ = await checkObjectValidations(updatedata, modelNames.PUMPS_COMBINATIONS, ModelStatusTypes.UPDATE)
                const response = await putData(`/update/updateone/${modelNames.PUMPS_COMBINATIONS}`, { data: updatedata, condition })
                return response;
            }
            return false;
        }

    } catch (error) {
        throw error;
    }
}

module.exports = { insert, getAll, updateNames, deleteItem }