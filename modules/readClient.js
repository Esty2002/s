const {getAll,getClientByField,getClientById}=require('../dal/db/sql/sql-operations')

async function getAllClient(){
    const result=await getAll()
    return result
}

async function getClientsByField(field ,value){
    const result=await getClientByField(field,value)
    return result
}

async function getClientsById(id){
    const result=await getClientById(id)
    return result
}

module.exports={getAllClient,getClientsByField,getClientsById}
