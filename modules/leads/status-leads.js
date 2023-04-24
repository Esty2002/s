const { insert, select, update } = require('../../services-leads/db/sql/sql-operations');

const tableName = "statusesLead";

const newLeadStatus = async (obj = null) => {
    let result;
    if (obj) {
        try {
            obj.tableName = tableName;
            obj.values = `'${obj.name}',GETDATE(),0,NULL`;
            result = await insert(obj);
        }

        catch (error) {
            throw new Error(error.message);
        }
    }
    else {
        throw new Error("the object is null");
    }
    return result;
}
const getStatusesLead = async () => {
    try {
        let result
        let obj = {};
        obj.tableName = tableName;
        obj.columns = `*`;
        obj.where = `disable='False'`;
        result = await select(obj);
    }
    catch (error) {
        throw new Error(error.message);
    }




    return result;
}
const deleteStatus = async ({ serialNumber }) => {
    let result;
    if (serialNumber) {
        try {
            let obj = {}
            obj.tableName = tableName;
            obj.set = `disable=1`
            obj.where = `serialNumber='${serialNumber}'`;
            result = await update(obj);
        }
        catch (error) {
            throw new Error(error.message);

        }

    }
    else {
        throw new Error("the serialNumber is not defined");
    }
    return result;
}
const updateStatus = async (obj) => {
    let result
    if (obj) {
        try{
            obj.tableName = tableName;
            obj.where = `serialNumber='${obj.serialNumber}'`;
            
            result = await update(obj);
        }
        catch(error){
            throw new Error(error.message);

        }
    }
    else {
        throw new Error("the object is not defined")
    }
    return result;
}
module.exports = { newLeadStatus, getStatusesLead, deleteStatus, updateStatus };