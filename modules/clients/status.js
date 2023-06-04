const { postData ,sqlServer} = require('../../services/axios')


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
        'tableName': 'tbl_Status',
        'columns': '*',
    }
    console.log(obj);
    const result = await postData(sqlServer,'http://127.0.0.1:1313/read/readTopN',obj);
    return result.data;
}

module.exports = { addOneStatus, deleteOneStatus, getStatusNumber }
