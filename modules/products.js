const { MongoDBOperations } = require('../services/db/mongo/mongo-operation')
const { MONGO_COLLECTION } = process.env

const mongo_operations = new MongoDBOperations()

async function insertProduct(obj) {
    return mongo_operations.insertOne(obj)
}

async function findObject(filter, project = {}) {
    return mongo_operations.findItem(filter, project)
}
async function getTraits(filter, project,sort) {
    filter['enabled'] = true
    return await mongoOperations.find(filter, project,sort)
}

module.exports = { insertProduct, findObject,getTraits }