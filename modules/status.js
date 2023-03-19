const {addStatus,deleteStatus}=require('../dal/db/sql/sql-operations')

async function addOneStatus(statusName){
    const result=await addStatus(statusName)
    return result.rowsAffected
}

async function deleteStatus(statusName){
    const result=await deleteStatus(statusName)
    return result.rowsAffected
}

module.exports={addOneStatus,deleteStatus}
