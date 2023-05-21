require('dotenv').config();
const { SQL_DB_BRANCHES ,SQL_DB_SUPPLIERS} = process.env;
const { setDate } = require('./functions');
const { getData, postData, sqlServer } = require('../services/axios');

async function deleteBranches(object) {
    try {
        const newDate = setDate(new Date());
        let obj = { tableName: SQL_DB_BRANCHES, values: { DisableUser: `${object.BranchName}`, Disabled: '1', DisabledDate: newDate }, condition: `SupplierCode= ${object.Id}  AND BranchName = '${object.BranchName}' ` };
        const res = await postData(sqlServer, "/update/update", JSON.stringify(obj));
        console.log(res);
        return res.recordset;
    }
    catch (error) {
        throw new Error('can not delete branch');
    }
}

// update details
async function updateDetail(code, setting) {
    try {
        let obj;
        if (setting.OldBranchName !== setting.BranchName) {
            obj = { tableName: SQL_DB_BRANCHES, columns: "*", condition: `BranchName ='${setting.BranchName}' AND SupplierCode=${code} AND Disabled='0' ` }
            const result = await postData(sqlServer, '/read/readTop20', JSON.stringify(obj));
            if (result.recordset.length !== 0) {
                return false;
            }
        }
        obj = {
            tableName: SQL_DB_BRANCHES, values: {
                SupplierCode: setting.SupplierCode, BranchName: setting.BranchName, Status: setting.Status,
                Street: setting.Street, HomeNumber: setting.HomeNumber, City: setting.City, ZipCode: setting.ZipCode, Phone1: setting.Phone1,
                Phone2: setting.Phone2, Mobile: setting.Mobile, Fax: setting.Fax, Mail: setting.Mail, Notes: setting.Notes
            }, condition: `SupplierCode=${code}, AND BranchName=${setting.OldBranchName}`
        }
        const res = await postData(sqlServer, "/update/update", JSON.stringify(obj));
        return res.recordset;
    }
    catch {
        throw new Error('can not update branch');
    }
}

//return all the branches 
async function getAllBranches() {
    try {
        let obj = { tableName: SQL_DB_BRANCHES,  columns: "*", condition: "1=1" };
        const res = await postData(sqlServer, "/read/readTop20", JSON.stringify(obj));
        console.log(res);
        return res.recordset;
    }
    catch (error) {
        throw new Error('can not get all the branches')
    }
}

//return all the branches that the condition for it and not disabled. 
async function getBranchesByCondition(column, code) {
    try {
        let obj = { tableName: SQL_DB_BRANCHES,  columns: "*", condition: `${column}='${code}' AND  Disabled='0'` };
        const res = await postData(sqlServer, "/read/readTop20", JSON.stringify(obj));
        console.log(res);
        return res.recordset;
    }
    catch (error) {
        throw error;
    }
}

//insert branch
async function insertOneBranch(object) {
    try {
        if (checkValid(object) && await checkUnique(object)) {
            const date = setDate(new Date());
            object['CreationDate'] = date;
            object["SupplierCode"]=parseInt(object["SupplierCode"]);
            object["HomeNumber"]=parseInt(object["HomeNumber"]);
            console.log(object);
            let obj = { tableName: SQL_DB_BRANCHES, values: object, condition: "1=1" };
            const res = await postData(sqlServer, "/create/create",obj);
            console.log(res, "insert branch");
            return res.recordset;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw new Error('can not insert branch');
    }
}

//check if must keys not empty and content
function checkValid(object) {
    let mustKeys = ["SupplierCode", "BranchName", "Street", "HomeNumber", "City", "Phone1", "UserThatInsert"];
    let array = Object.keys(object);
    for (let i = 0; i < mustKeys.length; i++) {
        if (!array.includes(mustKeys[i]) || (array.includes(mustKeys[i]) && object[mustKeys[i]] === "")) {
            return false;
        }
    }
    return true;
}

//check if uniques variable is unique
async function checkUnique(object) {
    try {
        let obj = { tableName: SQL_DB_SUPPLIERS,  columns: "*", condition: `Id='${object.SupplierCode }' AND  Disabled='0'` };
        const resultSupplierExist = await postData(sqlServer, "/read/readTop20", obj);
        obj = { tableName: SQL_DB_BRANCHES, columns: "*", condition: `BranchName ='${object.BranchName}' AND SupplierCode=${object.SupplierCode} AND Disabled='0' ` }
        const resultBranchName = await postData(sqlServer, "/read/readTop20", obj);
        return (resultBranchName.data.length === 0 && (resultSupplierExist.data.length !== 0));
    }
    catch (error) {
        throw new Error('can not insert branch');
    }
}

module.exports = { getAllBranches, insertOneBranch, updateDetail, deleteBranches, getBranchesByCondition, checkUnique, checkValid };
