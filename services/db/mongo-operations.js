const { getClient } = require('./mongo-connection')

const MONGO_DB = 'PRICE_LIST'

class MongoDBOperations {
    constructor(collectionName, dbName = MONGO_DB) {
        this.collectionName = collectionName
        this.dbName = dbName
    }

    async insertOne(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)
        return result
    }
    async findOne(filter, project) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(filter, { projection: project })
        return result
    }
    async find(filter, project) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).find(filter, project)
        return result
    }
    async findItems(filter = {}, project = {}, skip = 0) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).find(filter, { projection: project }).toArray()
        return result;
    }

    async updateOne(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).updateOne(obj)
        return result

    }
}

module.exports = { MongoDBOperations }