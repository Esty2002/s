require('dotenv').config()
const { postData, putData, getData, deleteData } = require('../../services/axios')
const { SQL_FINISH_PRODUCTS_TABLE } = process.env
const { findMeasureNumber, findMeasureName } = require('./measure')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { logToFile } = require('../../services/logger/logTxt')

const values = [
    {
        entity: "FinishProducts",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, AddedDate = null, Disabled = null, DisabledDate = null,DisableUser=null }) => {
            return {
                entityName: "FinishProducts",
                values: {
                    Name,
                    UnitOfMeasure,
                    BookkeepingCode,
                    AddedDate: new Date().toISOString(),
                    Disabled: false,
                    DisabledDate: null,
                    DisableUser:null
                },
                valuesFind: {
                    Name,
                    UnitOfMeasure,
                    BookkeepingCode,
                    AddedDate,
                    Disabled,
                    DisabledDate,
                    DisableUser
                }
            }
        }
    }
]

async function insertFinishProduct(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert  finished product in module',
        obj: obj,
        entityName: SQL_FINISH_PRODUCTS_TABLE
    }
    logToFile(objectForLog)


    const checkValidObj = values.find(({ entity }) => SQL_FINISH_PRODUCTS_TABLE === entity);
    let newObj = checkValidObj.func(obj)
    if (checkValidObj) {
        try {
            _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
            obj = newObj.values


            const response = await postData('/create/createone', { entityName: SQL_FINISH_PRODUCTS_TABLE, values: obj })
            if (response.data)
                return response
        }
        catch (error) {
            objectForLog.error = error.message
            logToFile(objectForLog)
            throw error
        }
    }
}
async function updateFinishProduct(obj) {
    try {
        const {condition, data} = obj
        const response = await putData('/update/updateone', { entityName: SQL_FINISH_PRODUCTS_TABLE, values: data, condition })
        if (response.status == 204)
            return response.data
        else
            return false

    } catch (error) {
        throw error;
    }
}

async function deleteFinishProduct({condition}){
    try {
        
        const response = await deleteData('/delete/deleteone', { entityName: SQL_FINISH_PRODUCTS_TABLE,values:{Disabled:true, DisableUser:'developer', DisabledDate:new Date()}, condition })
        if (response.status == 204)
            return response.data
        else
            return false

    } catch (error) {
        throw error;
    }
}

async function findFinishProduct(filter = {}) {


    const checkValidObj = values.find(({ entity }) => SQL_FINISH_PRODUCTS_TABLE === "FinishProducts");
    let newObj = checkValidObj.func(filter)
    if (checkValidObj)
        _ = await checkObjectValidations(newObj.valuesFind, checkValidObj.entity, true)
    if (!Object.keys(filter).includes('Disabled'))
        filter.Disabled = 0
    let condition = filter;
    let objForLog = {
        name: "find",
        description: "find finish products in module",
        filter: condition
    }
    logToFile(objForLog)

    try {
        const response = await getData(`/read/readMany/${SQL_FINISH_PRODUCTS_TABLE}`, condition)
        console.log(response.data)
        // for (const finish of response.data) {
        //     if (Object.keys(finish).includes('UnitOfMeasure')) {
        //         const measureName = await findMeasureName(finish.UnitOfMeasure)
        //         finish['UnitOfMeasure'] = measureName
        //     }
        // }
        return response
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        throw error
    }
}

module.exports = { insertFinishProduct, updateFinishProduct,deleteFinishProduct, findFinishProduct }
