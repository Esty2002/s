require('dotenv').config()
const { getClient } = require('./mongo-connection')

const { MONGO_DB } = process.env


class MongoDBOperations {
    constructor(collectionName="leads", dbName = MONGO_DB) {
        this.collectionName = collectionName
        this.dbName = dbName
    }

    async insertOne(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)
        return result.insertedId;
    }   
}

const mongo=new MongoDBOperations();
module.exports =  mongo 