
const { getAll, insert ,allTheOption} = require('../db/sql-operation');

async function getallSuppliers() {
    const result = await getAll('suppliers')
    return result;
}

async function getSupplier(obj) {
    console.log("obj.option");
    console.log(obj.text);
    console.log("obj.option");
    const result = await allTheOption("Suppliers",obj.option,obj.text)
    console.log(result,'getSupplierrrrrrrrrrrrrrrrrr');
    return result;
}
async function insertSuplier(table,columns, values) {
    const result = await insert(table,columns, values)
    return result;
}

module.exports = { getallSuppliers ,insertSuplier,getSupplier}