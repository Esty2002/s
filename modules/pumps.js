const { MongoDBOperations } = require('../services/db/sql/sql_operation')
const mongo_operations = new MongoDBOperations()

async function insertPumps(obj) {
    return mongo_operations.insertOne(obj)
}

async function findPumpst(filter, project = {}) {
    return mongo_operations.findItem(filter, project)
}
module.exports = {}