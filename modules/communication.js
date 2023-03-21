require('dotenv').config();

const MongoDBOperations = require('../dal/db/mongo/mongo-operations');
const { MONGO_COMMUNICATE_COLLECTION } = process.env;
// const mongo_operations = new MongoDBOperations(MONGO_COMMUNICATE_COLLECTION);

const mongo_operations = MongoDBOperations
mongo_operations.collectionName = MONGO_COMMUNICATE_COLLECTION

async function postCommunications(object) {
    const ans = await mongo_operations.insertOne(object);
    return ans;
}

module.exports = { postCommunications }