const { insert, select, update } = require('../../services/sql/sql-operations')


const newPouringType = async (obj = null) => {
    let result;
    if (obj) {
        obj.tableName = "puringsTypes";
        obj.values = `'${obj.name}',GETDATE(),0,NULL`;
        result = await insert(obj)
    }
    else {
        result = "the object is null";
    }

    return result;
}
const getPouringTypes = async () => {
    let result;
    let obj = {};
    obj.tableName = "puringsTypes";
    obj.columns = `name`;
    obj.where = `disable='False'`;
    result = await select(obj);
    return result;
}
const updatePouringType = async (obj = null) => {
    console.log(obj);
    let result
    if (obj) {
        obj.tableName = "puringsTypes";
        obj.where = `serialNumber=${obj.serialNumber}`;

        result = await update(obj);

    }
    else {
        result = "the object is null"
    }
    return result;
}

const deletePouringType = async ({ serialNumber }) => {
    let result;
    if (serialNumber) {
        let obj = {}
        obj.tableName = "puringsTypes";
        obj.set = "disable='True'";
        obj.where = `serialNumber=${serialNumber}`;
        result = await update(obj);
    }
    else {
        result = false;
    }
    return result;
}

module.exports = { newPouringType, getPouringTypes, deletePouringType, updatePouringType } 