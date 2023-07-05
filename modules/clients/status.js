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
<<<<<<< HEAD
    console.log("module,server");
=======
    console.log
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    let obj = {
        'tableName': 'tbl_Status',
        'columns': '*',
    }
    const result = await postData('/read/readTopN',obj);
<<<<<<< HEAD
    console.log({result})
=======
    console.log(result,'chani');
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    return result;
}

module.exports = { addOneStatus, deleteOneStatus, getStatusNumber }
