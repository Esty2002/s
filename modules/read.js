require('dotenv').config()
const { MongoDBOperations } = require('../services/db/mongo/mongo_operation')

const { MONGO_COLLECTION } = process.env
const mongoOperations = new MongoDBOperations(MONGO_COLLECTION)
 
async function getTraits(filter, project,sort) {
    filter['enabled'] = true
    return await mongoOperations.find(filter, project,sort)
}

module.exports = { getTraits }
