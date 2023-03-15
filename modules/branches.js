const {  insert, getByValues, del, setDate,insertBranch,  getIsDisabled, update } = require('../db/sql-operation');

//return all the branches
async function getallbranches() {
    const result = await getAll('Branches')
    return result;
}
//insert branch
async function insertbranch(object) {
    try {
        if (await checkValid(object) && await checkUnique(object)) {
            const date = await setDate();
            object['CreationDate'] = (Object.values(date.recordset[0]))[0];
            console.log(object['CreationDate'][0]);
            console.log(object);
            // const result = await insert("Branches", Object.keys(object).join(','),Object.values(object).join(','))
            const result = await insertBranch(object);
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
//update branch
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
//delete branch
async function deletebranches(object) {
    const date = await setDate()
    const newDate = date.recordset[0].Today
    console.log(newDate);
    //////////////////////////להוסיף משתנה גלובלי
    const resultSupplierCode = await del(SQL_DB_SUPPLIERS, '453', Object.values(object)[0])
    const resultSupplierCode2 = await changeDisabele(SQL_DB_SUPPLIERS, '453')
    const resultSupplierCode3 = await changeDisabledDate(SQL_DB_SUPPLIERS, '453', newDate)
    return resultSupplierCode

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
    const resultBranchName = await getByValues('Branches', 'BranchName', object.BranchName)
    return (resultBranchName.recordset.length === 0);
}

//check if the supplier disabled
async function checkDisabled(code) {
    const result = await getIsDisabled('Branches', 'SupplierCode', code)
    return (result.recordset.length > 0 && Object.values(result.recordset[0])[0] === true);
}

module.exports = { getallbranches, insertbranch, updateDetail ,deletebranches,checkUnique}
