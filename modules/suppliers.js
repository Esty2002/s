const { insert, getByValues, del, insertSupplier,insertBranch, changeDisabele, changeDisabledDate, getIsDisabled, setDate, update}=require('../db/sql-operation');


async function getallsuppliers(){
    const result = await getAll('Suppliers')
    return result;
}

async function insertsuppliers(object) {
    try {
        // await checkValid(object) && 
        if (await checkUnique(object)) {
            const date = await setDate();
            console.log('date');
            object['CreationDate'] = (Object.values(date.recordset[0]))[0];
            console.log(object['CreationDate'][0]);
            console.log('object');
            // const result = await insert("Branches", Object.keys(object).join(','),Object.values(object).join(','))
            const result = await insertSupplier(object)
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


module.exports={getallsuppliers,insertsuppliers,checkUnique,checkValid}