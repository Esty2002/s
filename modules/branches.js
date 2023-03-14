const { getAll, insert, getByValues, getIsDisabled, setDate, update } = require('../db/sql-operation');

async function getallbranches() {
    const result = await getAll('Branches')
    return result;
}

async function insertbranch(object) {
    console.log( JSON.stringify(Object.values(object)));
    let newVals = JSON.stringify(Object.values(object))
    try {
        if (await checkValid(object) && await checkUnique(object)) {
            const date = await setDate()
            object['CreationDate'] = Object.values(date.recordset[0])
            const result = await insert("Branches", Object.keys(object).join(','),newVals)
            console.log('vvvvvvvvvvvvvvvvvvvvvv');
            return result;
        }
        else {
            console.log('xxxxxxxxxxxxxxxxxxxxxx');
            return false;
        }
    }
    catch (error) {
        console.log('error');
        throw error;
    }
}

async function updateDetail(code, object) {
    try {
        if (await checkDisabled(code)) {
            console.log('before');
            const result = await update('Branches', object['field'], object['data'], code)
            console.log({ result });
            console.log('vvvvvvvvvvvvvvvvvvvvvv');
        }
        else {
            console.log('xxxxxxxxxxxxxxxxxxxxxxx');
            return false;
        }
    }
    catch {
        console.log('error');
        throw error;
    }
}

async function checkValid(object) {
    let mustKeys = ["SupplierCode", "BranchName", "Street", "HomeNumber", "City", "Phone1", "UserThatInsert"]
    let array = Object.keys(object)
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && object[mustKeys[i]] === "")) {
            return false
        }
    }
    return true;
}

async function checkUnique(object) {
    const resultSupplierCode = await getByValues('Branches', 'SupplierCode', object.SupplierCode)
    const resultBranchName = await getByValues('Branches', 'BranchName', object.BranchName)
    return (resultSupplierCode.recordset.length === 0 && resultBranchName.recordset.length === 0);
}

async function checkDisabled(code) {
    const result = await getIsDisabled('Branches', 'SupplierCode', code)
    return (result.recordset.length > 0 && Object.values(result.recordset[0])[0] === true);
}


module.exports = { getallbranches, insertbranch, updateDetail }