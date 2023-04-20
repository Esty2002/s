const { insert, select, update } = require('../../services-leads/db/sql/sql-operations')
const tableName="puringsTypes"

const newPouringType = async (obj = null) => {
    let result;
    if (obj) {
        try{
            obj.tableName = tableName;
            obj.values = `'${obj.name}',GETDATE(),0,NULL`;
            result = await insert(obj)
        }
        catch(error){
            throw new Error(error.message);
        }
        
    }
    else {
        throw new Error("the object is null");
    }

    return result;
}
const getPouringTypes = async () => {
    try{
        let result;
        let obj = {};
        obj.tableName = tableName;
        obj.columns = `*`;
        obj.where = `disable='False'`;
        result = await select(obj);
        return result;
    }
    catch(error){
        throw new Error("the object is null");

    }
    
}
const updatePouringType = async (obj = null) => {
    let result
    if (obj) {
        try{
            obj.tableName = tableName;
            obj.where = `serialNumber=${obj.serialNumber}`;
    
            result = await update(obj);
        }
        catch(error){
            throw new Error(error.message);
        }
        

    }
    else {
        throw new Error("the object is null")
    }
    return result;
}

const deletePouringType = async ({ serialNumber }) => {
    let result;
    if (serialNumber) {
        try{
            let obj = {}
            obj.tableName = tableName;
            obj.set = "disable='True'";
            obj.where = `serialNumber=${serialNumber}`;
            result = await update(obj);
        }
        catch(error){
            throw new Error(error.message);

        }
       
    }
    else {
        throw new Error("the serialNumber is null")
    }
    return result;
}

module.exports = { newPouringType, getPouringTypes, deletePouringType, updatePouringType } 