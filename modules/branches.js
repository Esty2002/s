const { getAll, setDate, insertBranch, delBranches, getIsDisabled, update, allTheOption, checkUniqueBranch } = require('../db/sql-operation');
require('dotenv').config();
const {SQL_DB_BRANCHES}=process.env;

async function updateDetail(code, setting) {
    try {
        if (await checkUniqueBranch(setting)) {
            // setting.map(f=>{
            //     console.log('f');
            //     replace(f, ':','-')
            // })
            // REPLACE (f, ':','-')
            const result = await update('Branches',`SupplierCode='${setting.SupplierCode}',BranchName='${setting.BranchName}',Status='${setting.Status}' ,
            Street='${setting.Street}',HomeNumber='${setting.HomeNumber}',City='${setting.City}',ZipCode='${setting.ZipCode}',Phone1='${setting.Phone1}' ,
            Phone2='${setting.Phone2}',Mobile='${setting.Mobile}',Fax='${setting.Fax}',Mail='${setting.Mail}',Notes='${setting.Notes}'`,code)
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
//update branch
// async function updateDetail(code, object) {
//     try {
//         if (await checkDisabled(code)) {
//             console.log('before');
//             const result = await update('Branches', object['field'], object['data'], code)
//             console.log({ result });
//         }
//         else {
//             return false;
//         }
//     }
//     catch {
//         console.log('error');
//         throw error;
//     }
// }
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
        throw new Error('can not insert branch');
    }
}
//delete branch
async function deletebranches(object) {
    const date = await setDate()
    const newDate = date.recordset[0].Today
    //////////////////////////להוסיף משתנה גלובלי
    const resultSupplierCode = await del(SQL_DB_SUPPLIERS, '453', Object.values(object)[0])
    return resultSupplierCode
}
// פונקציה ששולחת לפונקציות מחיקה
async function deleteBranches(object) {
    const date=await setDate()
    const newDate=date.recordset[0].Today
    const resultBranchCode = await delBranches(SQL_DB_BRANCHES, object.BranchName, object.DisableUser,newDate)
    return (resultBranchCode)
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
    const resultBranchName = await checkUniqueBranch(object.SupplierCode, object.BranchName)
    return (resultBranchName.recordset.length === 0);
}
//check if the supplier disabled
// async function checkDisabled(code) {
//     const result = await getIsDisabled('Branches', 'SupplierCode', code)
//     return (result.recordset.length > 0 && Object.values(result.recordset[0])[0] === true);
// }

module.exports = { getAllBranches, insertOneBranch, updateDetail ,deleteBranches,getBranchesByCondition,checkUnique};
