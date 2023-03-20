require('dotenv').config()
const  {MongoDBOperations}  = require('../services/db/mongo/mongo-operation')

const mongo_operations = new MongoDBOperations()

async function insertProduct(obj) {
    return mongo_operations.insertOne(obj)
}
async function updateProduct(filter={},obj){
    const result= await mongo_operations.updateOne(filter,obj)
    return result
}

async function findItem(project,filter){
    return await mongo_operations.findItem(project,filter)
}


module.exports={findItem,insertProduct,updateProduct}