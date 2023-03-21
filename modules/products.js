require('dotenv').config()

const { MongoDBOperations } = require('../services/db/mongo/mongo-operation')
const { MONGO_COLLECTION } = process.env

const mongo_operations = new MongoDBOperations()

async function insertProduct(obj) {
    obj['ordinalNumber'] = await (mongo_operations.countDocuments()) + 1
    return mongo_operations.insertOne(obj)
}

async function findObject(filter, project = {}) {
    return mongo_operations.findItem(filter, project)
}
async function getTraits(filter, project, sort) {
    filter['enabled'] = true
    return await mongo_operations.find(filter, project, sort)
}
async function updateProduct(condition, obj) {
    return await mongo_operations.update(condition, obj)
}
async function findProduct(filter, project = {}) {
    return mongo_operations.findItem(filter, project)
}

module.exports = { insertProduct, findObject, getTraits, updateProduct, findProduct }
