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
        'entityName': 'tbl_Status',
        'columns': '*',
    }
    const result = await postData('/read/readTopN',obj);
    console.log({result})
    return result;
}


async function getStatusNameById(id) {
    try {
        let obj = {
            'entityName': 'tbl_Status',
            'columns': '*',
            condition: `Id = ${id}`
        }
        const result = await postData('/read/readTopN', obj);
        return result;
    }
    catch (error) {
        throw error
    }
}

module.exports = { addOneStatus, deleteOneStatus, getStatusNumber, getStatusNameById }
