require('dotenv').config();
const { SQL_DB_BRANCHES, SQL_DB_SUPPLIERS } = process.env;
// const { setDate } = require('./functions');
const { getData, postData,   } = require('../../services/axios');

async function insertOneBranch(object) {
    try {
        console.log("inmsertBranch - module");
        if (checkValid(object) && await checkUnique(object)) {
            console.log("inserttttttt");
            object['CreationDate'] = new Date().toISOString();
            let obj = { entityName: 'Branches', values: object };
            const res = await postData("/create/createone", obj);
            return res;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error)
        throw new Error('can not insert branch');
    }
}
async function getAllBranches() {
    try {
        const res = await getData(`/read/readAll/${SQL_DB_BRANCHES}/Disabled = '0'`);
        return res.data;
    }
    catch (error) {
        throw new Error('can not get all the branches')
    }
}

async function getBranches(supplierid, disabled) {
    try {
        const response = await postData('/read/count', {
            entityName: 'branches', condition: {
                supplierid, disabled
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error.message)
        throw error
    }
}

async function getBranchById(query) {
    console.log({query});
    try {
        const res = await getData(`/read/readOne/Branches`, query);
        return res.data[0];
    }
    catch (error) {
        throw error;
    }
}


async function getBranchesByCondition(query) {
    console.log({query});
    try {
        const res = await getData(`/read/readMany/Branches`, query);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}

async function updateDetail(code, setting) {
    try {
        console.log("updatadetails",setting.BranchName);
        if (setting.OldBranchName !== setting.BranchName) {
            const result = await getData(`/read/readAll/Branches/BranchName ='${setting.BranchName}' AND SupplierCode=${code} AND Disabled='0'`);
            if (result.data.length !== 0) {
                return false;
            }
        }
        let obj = {
            entityName: 'Branches', values: {
                SupplierCode: setting.SupplierCode, BranchName: setting.BranchName, Status: setting.Status,
                Street: setting.Street, HomeNumber: setting.HomeNumber, City: setting.City, ZipCode: setting.ZipCode, Phone1: setting.Phone1,
                Phone2: setting.Phone2, Mobile: setting.Mobile, Fax: setting.Fax, Mail: setting.Mail, Notes: setting.Notes
            }, condition: {SupplierCode:code, BranchName:setting.OldBranchName, Disabled : '0'}
        }
        const res = await postData("/update/update", obj);
        console.log(res);
        return res;
    }
    catch {
        throw new Error('can not update branch');
    }
}

async function deleteBranches(object) {
    try {
        const newDate = new Date().toISOString();
        let obj = { entityName: 'Branches', values: { DisableUser: `${object.DisableUser}`, Disabled: '1', DisabledDate: newDate }, condition: { Id: object.Id } };
        const res = await postData("/update/update", obj);
        return res;
    }
    catch (error) {
        console.log(error.message)
        throw new Error('can not delete branch');
    }
}

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

async function checkUnique(object) {
    try {
        const resultSupplierExist = await getData(`/read/readOne/${SQL_DB_SUPPLIERS}`, { AND:[{ Id:object.SupplierCode} ,{ Disabled:0}]} );
        const resultBranchName = await getData(`/read/readOne/${SQL_DB_BRANCHES}`, { AND:[{BranchName :object.BranchName},{SupplierCode:object.SupplierCode}, {Disabled:0}]});
        return (resultBranchName.data.length === 0 && (resultSupplierExist.data.length !== 0));

    }
    catch (error) {
        throw new Error('can not insert branch');
    }
}

module.exports = { getAllBranches,getBranchById, insertOneBranch, updateDetail, deleteBranches, getBranchesByCondition, checkUnique, checkValid };
