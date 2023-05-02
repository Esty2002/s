// const { insert, select, update } = require('../../services-leads/db/sql/sql-operations');

const tableName = "orderers";
const newOrderer = async (obj = null) => {
    let result;
    if (obj) {

        obj.tableName = tableName;
        obj.values = `'${obj.name}','${obj.phone}',GETDATE(),0,NULL`;
        result = await insert(obj);

    }
    else {
        throw new Error("the object is null");
    }
    return result;
}
const getOrderers = async () => {
    let result;
    try {
        obj = {};
        obj.tableName = tableName;
        obj.columns = `*`;
        obj.where = `disable='False'`;
        result = await select(obj);
    }
    catch {
        throw new Error("the object is null");
    }
    return result;
}

const getOrdererByPhone = async ({ phone }) => {
    let result

    if (phone) {
        try {
            obj = {};
            obj.tableName = tableName;
            obj.columns = `name,phone`;
            obj.where = `phone='${phone}'`;
            result = await select(obj);
        }
        catch (error) {
            return error;
        }

    }
    else {
        throw new Error("the phone is not defined");
    }

    return result;
}

const updateOrderer = async (obj = null) => {
    let result
    if (obj) {

        obj.tableName = tableName;
        obj.where = `phone=${obj.phone}`;

        result = await update(obj);
    }
    else {
        throw new Error("the object is null");
    }
    return result;
}
const deleteOrderer = async ({ phone }) => {
    let result;
    if (phone) {
        try {
            let obj = {}
            obj.tableName = tableName;
            obj.set = "disable='True'";
            obj.where = `phone=${phone}`;
            result = await update(obj);
        }
        catch (error) {
            return error
        }
    }
    else {
        throw new Error("the object is null");

    }
    return result;
}
module.exports = { newOrderer, getOrderers, getOrdererByPhone, deleteOrderer, updateOrderer };