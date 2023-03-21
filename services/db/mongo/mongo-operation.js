require('dotenv').config()
const { getClient } = require('./mongo_connection')

const { MONGO_DB, MONGO_COLLECTION } = process.env

class MongoDBOperations {
    constructor(collectionName = MONGO_COLLECTION, dbName = MONGO_DB) {
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
    async update(filter = {}, s) {
        const res = await getClient().db(this.dbName).collection(this.collectionName).update(filter, { $set: s })
        return res
    }

    async countDocuments() {
        return await getClient().db(this.dbName).collection(this.collectionName).countDocuments()
    }

}

module.exports = { MongoDBOperations }
