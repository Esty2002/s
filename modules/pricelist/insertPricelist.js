const { postData, getData, putData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { ModelStatusTypes, ErrorTypes } = require('../../utils/types')
const { modelNames } = require('../utils/schemas')

async function insert(data, entityName) {
    let obj = {}
    let objectForLog = {
        name: entityName,
        description: 'insert in module',
        dataThatRecived: data
    }
    logToFile(objectForLog)
    try {

        data = await checkObjectValidations(data, modelNames.PRICELIST)
        const result = await postData(`/create/createone/${modelNames.PRICELIST}`, {  data })
        if (result.data)
            return result;
        else
            throw new Error('object was not created')
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        if(error.type === ErrorTypes.VALIDATION){
            let errorMessage = error.data.reduce((message, {error})=>[...message, error], [] ).join(',')
            throw new Error(errorMessage);
        }
        throw error
    }
}

async function addCustomerAndArea(data) {
    try {
        const startDate = new Date(data.startDate)
        if (data.endDate === undefined) {
            data.endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1))
        }
        else {
            const endDate = new Date(data.endDate)
            if (endDate < startDate) {
                // const error = { type: ErrorTypes.VALIDATION }
                // error.data = [{ propertyName: 'endDate', error: 'endDate must be after startDate' }]
                // throw error
                data.endDate = new Date(startDate.setFullYear(startDate.getFullYear() + 1))
            }
        }

        data = await checkObjectValidations(data, modelNames.PRICELIST_FOR_BUYTON_CUSTOMERS, ModelStatusTypes.CREATE)
        console.log({ data });
        const response = await postData(`/create/createone/${ modelNames.PRICELIST_FOR_BUYTON_CUSTOMERS}`, {  data })
        return response.data
    }
    catch (error) {
        console.log({ error });
        if(error.type === ErrorTypes.VALIDATION){
            let errorMessage = error.data.reduce((message, {error})=>[...message, error], [] ).join(',')
            throw new Error(errorMessage);
        }
        throw error;
    }
}

async function getProducts(entityName) {
    let objForLog = {
        name: 'detailsOfProfucts',
        description: 'getProducts in module',
        dataThatRecived: entityName
    }
    logToFile(objForLog)
    try {
        const response = await getData(`/read/readMany/${entityName}`)
        if (response.data)
            return response;
        else
            throw new Error('data not found')
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

async function updateField(id, entityName, value) {
    let objForLog;
    objForLog = {
        name: 'updateFieldInTable',
        description: 'updateField in module', id, entityName, value
    }
    logToFile(objForLog)
    try {
        _ = await checkObjectValidations(value, modelNames.PRICELIST)

        const response = await putData('update/updateone', obj)
        if (response) {
            return response
        }
        else{
            throw new Error('data not found')
        }
    }
    catch (error) {

        objForLog.error = error.message
        logToFile(objForLog)
        if(error.type === ErrorTypes.VALIDATION){
            let errorMessage = error.data.reduce((message, {error})=>[...message, error], [] ).join(',')
            throw new Error(errorMessage);
        }
        throw error
    }
}
async function getId(name, entityName) {
    let objForLog = {
        name: 'getIdForPricelistName',
        description: 'getId in module',
        pricelistName: name
    }
    logToFile(objForLog)
    try {
        let obj = {}
        obj.condition = { Name: name }
        const response = await postData(`/read/readMany/${entityName}`, obj)
        if (response.data.length > 0) {
            return response
        }
        else {
            throw new Error('data not found')
        }
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

async function getIdForBuytonDescribe(name, entityName) {
    let objForLog = {
        name: 'read',
        description: 'getIdForBuytonDescribe in module expects: name, tbname',
        describe: name,
        entityName
    }
    logToFile(objForLog)
    try {
        let obj = {}
        let field = entityName.substring(10)
        field = field + 'Describe'
        // let condition = `${field}='${name}'`
        obj.entityName = entityName
        obj.condition = { [field]: name }
        const response = await postData(`/read/readMany/${entityName}`, obj)
        if (response.data.length > 0)
            return response;
        else
            throw new Error('data not found')
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

async function getNumber(object, tbName) {
    object = object.data[0]
    let number = tbName.substring(10) + 'Number'
    let result = `${object[number]}`
    if (result)
        return result;
    else
        throw new Error('data not found')
}

module.exports = {
    insert,
    addCustomerAndArea,
    getProducts, getId, getIdForBuytonDescribe, updateField, getNumber
}