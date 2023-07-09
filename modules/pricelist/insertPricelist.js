
const { postData, getData } = require('../../services/axios')
const { logToFile } = require('../../services/logger/logTxt')
async function insert(data, tableName) {
    let obj = {}
    obj['tableName'] = tableName
    obj['values'] = data
    obj['columns'] = '*'
    let object={}
    try {
        object = {
            name: 'addPriceList',
            description: 'insert in module',
            dataThatRecived: data
        }
        logToFile(object)
        const result = await postData('/create/create', obj)
        return result;
    }
    catch (error) {
        object.error=error.message
        logToFile(object)
        throw error
    }
}

async function getProducts(tbName) {
    let params = { tbName }
    let object = {
        name: 'read',
        description: 'getProducts in module',
        dataThatRecived: params
    }
    logToFile(object)
    let obj = {}
    obj['tableName'] = tbName
    obj['columns'] = '*'

    const response = await postData('/read/readTopN', obj)
    return response.data;
}

async function updateField(id, tbName, value) {
    let params = { id, tbName }
    let object = {
        name: 'update',
        description: 'updateField in module',
        dataThatRecived: params,
        value
    }
    logToFile(object)
    let obj = {
        "tableName": tbName,
        "condition": `Id=${id}`,
        "values": value
    }
    const response = await postData('update/update', obj)
    if (response.data.rowsAffected[0] > 1)
        return true
    return false
}

async function getId(name, tbName) {
    let params = { name, tbName }
    let object = {
        name: 'read',
        description: 'getId in module',
        dataThatRecived: params
    }
    logToFile(object)
    let condition = `Name='${name}'`
    console.log({ condition });
    const response = await getData(`/read/readAll/${tbName}/${condition}`)
    console.log(response, ' res');
    object = {
        name: 'read',
        description: 'getId after sending to db',
        result: response.data[0].Id
    }
    logToFile(object)
    return response.data[0].Id
}
async function isFieldExistinTable(field, tableName, value) {
    try {

        const response = await getData(`read/exist/${tableName}/${field}/${value}`)
        console.log({response});
        if (response)
            return true
        else
            return false
    }
    catch (error) {
        return error.message
    }


}

async function getIdForBuytonDescribe(name, tbName) {
    let params = { name, tbName }
    let object = {
        name: 'read',
        description: 'getIdForBuytonDescribe in module expects: name, tbname',
        dataThatRecived: params
    }
    logToFile(object)
    let field = tbName.substring(10)
    field = field + 'Describe'
    let condition = `${field}='${name}'`
    // const ans = await isFieldExistinTable(field, tbName, name)
    // if (ans) {
        const response = await getData(`/read/readAll/${tbName}/${condition}`)
        return response.data
    // }
    // else{
        // console.log('there is a problem!');
    // }

}

module.exports = { insert, getProducts, getId, getIdForBuytonDescribe, updateField }
