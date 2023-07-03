const { postData } = require('../../services/axios')


async function addOneStatus(statusName) {
    // const result = await addStatus(statusName)
    // return result.rowsAffected
}

async function deleteOneStatus(statusName) {
    // const result = await deleteStatus(statusName)
    // return result.rowsAffected
}

async function getStatusNumber() {
    console.log
    let obj = {
        'tableName': 'tbl_Status',
        'columns': '*',
    }
    const result = await postData('/read/readTopN',obj);
    console.log(result,'chani');
    return result;
}

module.exports = { addOneStatus, deleteOneStatus, getStatusNumber }
