const {addStatus,deleteStatus,getStatus}=require('../dal/db/sql/sql-operations')

async function addOneStatus(statusName){
    const result=await addStatus(statusName)
    return result.rowsAffected
}

async function deleteOneStatus(statusName){
    const result=await deleteStatus(statusName)
    return result.rowsAffected
}
async function getStatusNumber() {
    const result = await getStatus();
    return result;
}

module.exports={addOneStatus,deleteOneStatus,getStatusNumber}
