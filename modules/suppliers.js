require('dotenv').config();
const {SQL_DB_SUPPLIERS ,SQL_DB_BRANCHES} = process.env;
const { insertSupplier,allTheOption, getAll, getByValues, delBranches,delSupllier, setDate }=require('../db/sql-operation');

//delet the supplier and update the fields
async function deleteSupplier(object) {
    try{
         const date=await setDate()
    const newDate=date.recordset[0].Today
    const resultSupplierCode = await delSupllier(SQL_DB_SUPPLIERS,SQL_DB_BRANCHES, object.SupplierCode, object.DisableUser,newDate)
    return (resultSupplierCode)
    }
    catch(error){
        console.log('error');
        throw new Error('can not delete supplier');
    }
   
}

//return all the Supplier that the condition for it and not disabled.
async function getBranchesByCondition(column, code) {
    const result = await allTheOption('Supplier', column, code);
    return result;
}

//פונקציה שמקבלת נתוני כל הספקים
async function getAllSuppliers() {
    const result = await getAll('suppliers')
    return result;
}
//פונקציה שמקבלת נתוני ספק לפי החיפוש ששולחים לו
async function getSupplier(obj) {
    const result = await allTheOption("Suppliers",obj.option,obj.text)
    return result;
}
async function insertOneSupplier(object) {
    try {
        // await checkValid(object) && 
        if (await checkUnique(object)) {
            const date = await setDate();
            object['CreationDate'] = (Object.values(date.recordset[0]))[0];
            const result = await insertSupplier(object)
            return result;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
}
async function checkValid(object) {
    //לבדוק שהאותיות אותיות והמספרים מספרים
    //לבדוק את מספר הטלפון שהוא תקין
    //לבדוק את תקינות המייל
    let mustKeys = ["SupplierCode", "SupplierName", "licensedDealerNumber", "Status", "Street", "HomeNumber", "City", "Phone1", "CreationDate"]
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
    console.log(';');
    console.log(object);
    console.log(';');
    const resultSupplierCode = await getByValues('Suppliers', 'SupplierCode', object.SupplierCode)
    const resultSuppliersName = await getByValues('Suppliers', 'SupplierName', object.SupplierName)
    return (resultSupplierCode.recordset.length === 0 && resultSuppliersName.recordset.length === 0);
}


module.exports = { deleteSupplier,getAllSuppliers ,insertOneSupplier,checkValid,checkUnique,getSupplier,getBranchesByCondition};
