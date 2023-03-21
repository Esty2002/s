const { getSupplier } = require('../modules/suppliers')
const { getAll, delBranches,  update, allTheOption,insertBranch, checkUniqueBranch} = require('../db/sql-operation');
const {setDate}=require('../services/functions');
require('dotenv').config();
const { SQL_DB_BRANCHES } = process.env;

//delet the branch and update the fields
async function deleteBranches(object) {
    try {
        const newDate = await setDate(new Date())
        const resultBranchCode = await delBranches(SQL_DB_BRANCHES, object.SupplierCode, object.DisableUser, newDate, object.BranchName)
        return (resultBranchCode)
    }
    catch (error) {
        console.log('error');
        throw new Error('can not delete branch');
    }
}

async function updateDetail(code, setting) {
    try {
        if (await checkUniqueBranch(setting)) {
            // setting.map(f=>{
            //     console.log('f');
            //     replace(f, ':','-')
            // })
            // REPLACE (f, ':','-')
            const result = await update('Branches', `SupplierCode='${setting.SupplierCode}',BranchName='${setting.BranchName}',Status='${setting.Status}' ,
            Street='${setting.Street}',HomeNumber='${setting.HomeNumber}',City='${setting.City}',ZipCode='${setting.ZipCode}',Phone1='${setting.Phone1}' ,
            Phone2='${setting.Phone2}',Mobile='${setting.Mobile}',Fax='${setting.Fax}',Mail='${setting.Mail}',Notes='${setting.Notes}'`, code,{'BranchName':setting.OldBranchName})
            return result;
        }
        else {
            return false;
        }
    }
    catch {
        console.log('error');
        throw new Error('can not update branch');
    }
}
//return all the branches 
async function getAllBranches() {
    try {
        const result = await getAll('Branches');
        return result;
    }
    catch (error) {
        throw error;
    }
}
//return all the branches that the condition for it and not disabled. 
async function getBranchesByCondition(column, code) {
    try {
        const result = await allTheOption('Branches', column, code);
        return result;
    }
    catch (error) {
        throw error;
    }
}
//insert branch
async function insertOneBranch(object) {
    try {
        if (await checkValid(object) && await checkUnique(object)) {
            object['CreationDate'] =await setDate(new Date());
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
    try{
        const resultSupplierExist = await getSupplier({ option: 'SupplierCode', text: object.SupplierCode })
        const resultBranchName = await checkUniqueBranch(object.SupplierCode, object.BranchName)
        return (resultBranchName.recordset.length === 0 && (resultSupplierExist.recordset.length !== 0));
    }
    catch(error){
        console.log('error');
        throw new Error('can not insert branch');;
    }
}

module.exports = { getAllBranches, insertOneBranch, updateDetail, deleteBranches, getBranchesByCondition, checkUnique ,checkValid};
