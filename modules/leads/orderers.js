const { insert, select, update } = require('../../services/sql/sql-operations');


const newOrderer = async (obj = null) => {
    let result;
    if (obj) {

        obj.tableName = "orderers";
        obj.values = `'${obj.name}','${obj.phone}',GETDATE(),0,NULL`;
        result = await insert(obj);

    }
    else {
        result = "the object is null";
    }
    return result;
}
const getOrderers = async () => {
    let result;
    try {
        obj = {};
        obj.tableName = "orderers";
        obj.columns = `name`;
        obj.where = `disable='False'`;
        result = await select(obj);
    }
    catch {
        result = "crash....................";
    }
    return result;
}

const getOrdererByPhone = async ({ phone }) => {
    let result
    obj = {};
    obj.tableName = "orderers";
    obj.columns = `name,phone`;
    obj.where = `phone='${phone}'`;
    result = await select(obj);
    return result;
}

const updateOrderer = async (obj = null) => {
    let result
    if (obj) {
        obj.tableName = "orderers";
        obj.where = `serialNumber=${obj.serialNumber}`;

        result = await update(obj);
    }
    else {
        result = "the object is null"
    }
    return result;
}
const deleteOrderer = async ({ serialNumber }) => {
    let result;
    if (serialNumber) {
        let obj = {}
        obj.tableName = "orderers";
        obj.set = "disable='True'";
        obj.where = `serialNumber=${serialNumber}`;
        result = await update(obj);
    }
    else {
        result = false;
    }
    return result;
}
module.exports = { newOrderer, getOrderers, getOrdererByPhone, deleteOrderer, updateOrderer };