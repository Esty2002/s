require('dotenv').config()
const { getClient } = require('./mongo-connection')

const { MONGO_DB } = process.env


class MongoDBOperations {
    constructor(collectionName = "", dbName = MONGO_DB) {
        this.collectionName = collectionName
        this.dbName = dbName
    }

    async insertOne(obj = null) {
        let result;
        if (obj) {
            result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)
            result = result.insertedId;
        }
        else {
            result = false;
        }
        return result;
    }
}

const mongoOperations = new MongoDBOperations();
module.exports = { mongoOperations }