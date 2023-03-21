require('dotenv').config()
const { getClient } = require('./mongo_connection')

const { MONGO_DB, COLLECTION_NAME } = process.env

class MongoDBOperations {
    constructor(collectionName = COLLECTION_NAME, dbName = MONGO_DB) {
        console.log("data name:", dbName);
        this.collectionName = collectionName
        this.dbName = dbName
    }
    async insertOne(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)
        return result
    }
    async insertMany(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertMany(obj)
        return result
    }
    async findItem(filter, project) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(filter, { projection: project })
        console.log(result);
        return result
    }
    async find(filter = {}, project = {}, sort = {}) {
        let s = {}
        s[sort] = 1
        return await getClient().db(this.dbName).collection(this.collectionName).find(filter, { projection: project }).sort(s).toArray()
    }

    // async findMany(obj) {
    //     const result = await getClient().dbName(this.dbName).collection(this.collectionName).findMany(obj).toArrey
    //     return result.insertedId
    // }

}

module.exports = { MongoDBOperations }
