
const { postData, getData } = require('../../services/axios')



async function insert(data, tableName) {
    let obj = {}
    console.log(data, ' data');
    console.log(tableName, ' tbname');

    obj['tableName'] = tableName
    obj['values'] = data
    obj['columns'] = '*'

    _ = await postData('/create/create', obj)
    return true;
}

async function getProducts(tbName) {
    let obj = {}
    obj['tableName'] = tbName
    obj['columns'] = '*'

    const response = await postData('/read/readTopN', obj)
    console.log(response.data, ' res');

    return response.data;
}

async function getId(name, tbName) {
    let condition = `Name='${name}'`
    console.log({name});
    console.log({tbName});
    const response = await getData(`/read/readAll/${tbName}/${condition}`)
    console.log(response.data,"---------------");
    return response
}


module.exports = { insert, getProducts, getId }