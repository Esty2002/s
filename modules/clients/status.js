const { getData,postData } = require('../../services/axios')


async function addOneStatus(statusName) {
    const result = await addStatus(statusName)
    return result.rowsAffected
}

async function deleteOneStatus(statusName) {
    const result = await deleteStatus(statusName)
    return result.rowsAffected
}

async function getStatusNumber() {
    let obj = {
        'tableName': 'status',
        'columns': '*',
        //how can i make it without the condition attribute.?????? and I need reed All and not top20
        'condition':`serialNumber<${10}`
    }
    const result = await postData('http://127.0.0.1:1313/read/readTop20',JSON.stringify(obj));
    return result;
}

module.exports = { addOneStatus, deleteOneStatus, getStatusNumber }
