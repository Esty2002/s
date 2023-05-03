// const { getData,postData } = require('../../services/axios')
const tableName="puringsTypes"
const {sqlServer,postData,getData}=require('../../services/axios')
const newPouringType = async (obj = null) => {
    let result;
    if (obj) {
        try{
            obj.tableName = tableName;
            obj.values = `'${obj.name}',GETDATE(),0,NULL`;
            result = await postData(sqlServer,'create/create',obj)
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
        obj.condition = `disable='False'`;
        result = await postData(sqlServer,'/read/readTop20',obj);
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
            obj.condition = `serialNumber=${obj.serialNumber}`;
    
            result = await postData(sqlServer,'update/update',obj);
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
            obj.condition = `serialNumber=${serialNumber}`;
            result = await postData(sqlServer,'update/update',obj);
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