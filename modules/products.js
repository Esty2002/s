require('dotenv').config()
const  {MongoDBOperations}  = require('../services/db/mongo/mongo-operation')

const mongo_operations = new MongoDBOperations()

async function updateProduct(condition,obj){
    return await mongo_operations.update(condition,obj)
}

async function insertProduct(obj) {
    return mongo_operations.insertOne(obj)
} 

async function findProduct(filter,project={}) {
    return mongo_operations.findItem(filter,project)
}
module.exports={updateProduct,insertProduct,findProduct}                