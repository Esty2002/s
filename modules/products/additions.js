require('dotenv').config()
const { postData, putData, getData } = require("../../services/axios");
const { logToFile } = require('../../services/logger/logTxt');
const { checkObjectValidations } = require('../../services/validations/use-validations');
const { SQL_ADDITIONS_TABLE } = process.env
const { findMeasureName, findMeasureNumber } = require('./measure')

const values = [
    {
        entity: "Additions",
        func: ({ Name = null, UnitOfMeasure = null, BookkeepingCode = null, AddedDate = null, Enabled = null, DeleteDate = null }) => {
            return {
                entityName: "Additions",
                values: {
                    Name,
                    UnitOfMeasure,
                    BookkeepingCode,
                    AddedDate: new Date().toISOString(),
                    Enabled: true,
                    DeleteDate: null,
                },
                valuesFind: {
                    Name,
                    UnitOfMeasure,
                    BookkeepingCode,
                    AddedDate,
                    Enabled,
                    DeleteDate,
                }
            }
        }
    }
]

async function insertAddition(obj) {
    let objectForLog = {
        name: 'create',
        description: 'insert addition in module',
        obj: obj,
        entityName: SQL_ADDITIONS_TABLE
    }
    logToFile(objectForLog)

    const checkValidObj = values.find(({ entity }) => entity==='Additions'  );
    let newObj = checkValidObj.func(obj)
    if (checkValidObj) {
        try {
            _ = await checkObjectValidations(newObj.values, checkValidObj.entity)
            obj = newObj.values



            const response = await postData('/create/createone', { entityName: SQL_ADDITIONS_TABLE, values: obj })
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

async function findAddition(filter = {}) {
    const checkValidObj = values.find(({ entity }) => SQL_ADDITIONS_TABLE === entity);
    let newObj = checkValidObj.func(filter)
    if (checkValidObj)
        try {
            _ = await checkObjectValidations(newObj.valuesFind, checkValidObj.entity, true)

            if (!Object.keys(filter).includes('Enabled'))
                filter.Enabled = 1

            let condition = filter;

            let objForLog = {
                name: "find",
                description: "find Addition in module",
                filter: condition,
            }
            logToFile(objForLog)
            const response = await getData(`/read/readMany/${SQL_ADDITIONS_TABLE}`, condition)

            // for (let finish of response.data) {
            //     if (Object.keys(finish).includes('UnitOfMeasure')) {
            //         const measureName = await findMeasureName(finish.UnitOfMeasure)
            //         finish['UnitOfMeasure'] = measureName.data[0].measure
            //     }
            // }
            return response
        }
        catch (error) {
            objForLog.error = error.message
            logToFile(objForLog)
            throw error
        }


    // filter['enabled'] = 1
    // let answer = (await postData(  `/read/readTopN`, { tableName: SQL_ADDITIONS_TABLE, columns: project.length > 0 ? project.join(',') : '*', condition: filter ? `${Object.keys(filter)[0]}='${Object.values(filter)[0]}'` : "" })).data
    // for (const add of answer) {
    //     if (Object.keys(add).includes('unitOfMeasure')) {
    //         add['unitOfMeasure'] = await findMeasureName(add['unitOfMeasure'])
    //     }
    // }
}

async function updateAddition(obj = {}) {
    try {
        const response = await putData('/update/updateone', { entityName: SQL_ADDITIONS_TABLE, values: obj.data, condition: obj.condition })
        if (response.status == 204)
            return response.data
        else
            return false
    } catch (error) {
        throw error;
    }
}

module.exports = { updateAddition, findAddition, insertAddition }
