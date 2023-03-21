const { insert, select, update } = require('../../services/sql/sql-operations');

const newLeadStatus = async (obj = null) => {
    let result;
    if (obj) {
        obj.tableName = "statusesLead";
        obj.values = `'${obj.name}',GETDATE(),0,NULL`
        result = await insert(obj);
    }
    else {
        result = "the object is null";
    }
    return result;
}
const getStatusesLead = async () => {

    let result
    let obj = {};
    obj.tableName = "statusesLead";
    obj.columns = `name`;
    obj.where = `disable='False'`;
    result = await select(obj);




    return result;
}
const deleteStatus = async ({ serialNumber }) => {
    let result;
    if (serialNumber) {
        let obj = {}
        obj.tableName = "statusesLead";
        obj.set = `disable=1`
        obj.where = `serialNumber='${serialNumber}'`;
        result = await update(obj);
    }
    else {
        result = "the status is null";
    }
    return result;
}
const updateStatus = async (obj) => {
    let result
    if (obj) {
        obj.tableName = "statusesLead";
        obj.where = `serialNumber='${obj.serialNumber}'`;
        result = await update(obj);
    }
    else {
        result = "the object is null";
    }
    return result;
}
module.exports = { newLeadStatus, getStatusesLead, deleteStatus, updateStatus };