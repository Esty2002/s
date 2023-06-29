
const { postData, getData } = require('../../services/axios')
const { logToFile } = require('../../services/loggerPnini')
async function insert(data, tableName) {
    let obj = {}
    obj['tableName'] = tableName
    obj['values'] = data
    obj['columns'] = '*'
    try {
        // let object = {
        //     name: 'create',
        //     description: ' insert in module',
        //     dataThatRecived: data
        // }

        // logToFile(object)
        const result = await postData('/create/create', obj)
        let id = result.data[0].Id
        // object = {
        //     name: 'create',
        //     description: ' insert in module, after sending to dbserver',
        //     result: id
        // }
        // logToFile(object)
        return result;
    }
    catch (error) {
        let object = {
            name: 'create',
            description: 'create in module -you have an error!',
            error: error.message,
            dataThatRecived: data,
        }
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
    object = {
        name: 'read',
        description: 'getId after sending to db',
        result: response.data[0].Id
    }
    logToFile(object)
    return response.data[0].Id
}

async function getIdForBuytonDescribe(name, tbName) {
    let params = { name, tbName }
    let object = {
        name: 'read',
        description: 'getIdForBuytonDescribe in module expects: name, tbname',
        dataThatRecived: params
    }
    logToFile(object)
    let t = tbName.substring(10)
    t = t + 'Describe'
    let condition = `${t}='${name}'`
    const response = await getData(`/read/readAll/${tbName}/${condition}`)
    return response.data
}

module.exports = { insert, getProducts, getId, getIdForBuytonDescribe, updateField }
