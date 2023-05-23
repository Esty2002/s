require('dotenv').config()
const {getClient} = require('./mongo_connection')

const { MONGO_DB ,COLLECTION_NAME} = process.env

class MongoDBOperations {
    constructor(collectionName = COLLECTION_NAME, dbName = MONGO_DB) {
        this.collectionName = collectionName
        this.dbName = dbName
    }
    async insertOne(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)
        return result.insertedId
    }
    async findItem(filter = {}, project = {}) {   
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(filter, { projection: project })
        return result
    }
    async updateOne(filter={},s){
        const res=await getClient().db(this.dbName).collection(this.collectionName).updateOne(filter,{$set: s})
        return res
    }
}

module.exports = { MongoDBOperations }
