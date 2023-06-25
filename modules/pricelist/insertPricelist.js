
const { postData, getData } = require('../../services/axios')
async function insert(data, tableName) {
    let obj = {}
    obj['tableName'] = tableName
    obj['values'] = data
    obj['columns'] = '*'
    const result = await postData('/create/create', obj)

    if(result.data) {
        return result;
    }
    else {
        return false
    }

}

async function getProducts(tbName) {
    let obj = {}
    obj['tableName'] = tbName
    obj['columns'] = '*'

    const response = await postData('/read/readTopN', obj)
    return response.data;
}

async function updateField(id, tbName, value) {
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
    console.log(tbName, ' tbname in getId');
    let condition = `Name='${name}'`
    console.log({ condition });
    const response = await getData(`/read/readAll/${tbName}/${condition}`)
    return response
}

async function getIdForBuytonDescribe(name, tbName) {
    let t = tbName.substring(10)
    t = t + 'Describe'
    let condition = `${t}='${name}'`
    const response = await getData(`/read/readAll/${tbName}/${condition}`)
    return response
}

module.exports = { insert, getProducts, getId, getIdForBuytonDescribe, updateField }
