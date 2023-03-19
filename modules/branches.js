const { allTheOption, getAll, getByValues, getIsDisabled, setDate, update, delBranches, insertBranch } = require('../db/sql-operation');
require('dotenv').config();
const { SQL_DB_BRANCHES } = process.env;

//delet the branch and update the fields
async function deleteBranches(object) {
    try {
        const date = await setDate()
        const newDate = date.recordset[0].Today
        const resultBranchCode = await delBranches(SQL_DB_BRANCHES, object.SupplierCode, object.DisableUser, newDate, object.BranchName)
        return (resultBranchCode)
    }
    catch (error) {
        console.log('error');
        throw new Error('can not delete branch');
    }
}

//return all the branches
async function getAllBranches() {
    const result = await getAll('Branches');
    return result;
}

//return all the branches that the condition for it and not disabled.
async function getBranchesByCondition(column, code) {
    const result = await allTheOption('Branches', column, code);
    return result;
}
//insert branch
async function insertOneBranch(object) {
    try {
        if (await checkValid(object) && await checkUnique(object)) {
            const date = await setDate();
            object['CreationDate'] = (Object.values(date.recordset[0]))[0];
            console.log(object['CreationDate'][0]);
            console.log(object);
            // const result = await insert("Branches", Object.keys(object).join(','),Object.values(object).join(','))
            const result = await insertBranch(object);
            return result;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log('error');
        throw error;
    }
}
//update branch
async function updateDetail(code, object) {
    try {
        if (await checkDisabled(code)) {
            console.log('before');
            const result = await update('Branches', object['field'], object['data'], code)
            console.log({ result });
        }
        else {
            return false;
        }
    }
    catch {
        console.log('error');
        throw error;
    }
}


//check if must keys not empty and content
async function checkValid(object) {
    //לבדוק שהאותיות אותיות והמספרים מספרים
    //לבדוק את מספר הטלפון שהוא תקין
    //לבדוק את תקינות המייל
    let mustKeys = ["SupplierCode", "BranchName", "Street", "HomeNumber", "City", "Phone1", "UserThatInsert"]
    let array = Object.keys(object)
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && object[mustKeys[i]] === "")) {
            return false
        }
    }
    return true;
}
//check if uniques variable is unique
async function checkUnique(object) {
    const resultSupplierCode = await getByValues('Branches', 'SupplierCode', object.SupplierCode)
    const resultBranchName = await getByValues('Branches', 'BranchName', object.BranchName)
    return (resultSupplierCode.recordset.length === 0 && resultBranchName.recordset.length === 0);
}

//check if the supplier disabled
async function checkDisabled(code) {
    const result = await getIsDisabled('Branches', 'SupplierCode', code)
    return (result.recordset.length > 0 && Object.values(result.recordset[0])[0] === true);
}

module.exports = { getAllBranches, insertOneBranch, updateDetail, deleteBranches, getBranchesByCondition, checkUnique };
