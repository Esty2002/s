const { postData } = require('../../services/axios')


async function addOneStatus(statusName) {
    const result = await addStatus(statusName)
    return result.rowsAffected
}

async function deleteOneStatus(statusName) {
    const result = await deleteStatus(statusName)
    return result.rowsAffected
}

async function getStatusNumber() {
    console.log("module,server");
    let obj = {
        'tableName': 'tbl_Status',
        'columns': '*',
    }
    const result = await postData('/read/readTopN',obj);
    return result;
}

module.exports = { addOneStatus, deleteOneStatus, getStatusNumber }
