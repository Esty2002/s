const { MongoDBOperations } = require('../services/db/mongo/mongo-operation')

const mongo_operations = new MongoDBOperations()

async function insertProduct(obj) {
    return mongo_operations.insertOne(obj)
}

async function findObject(filter, project = {}) {
    return mongo_operations.findItem(filter, project)
}

module.exports = { insertProduct, findObject }