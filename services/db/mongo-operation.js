const { getClient } = require('./mongo-connection')

const { MONGO_DB } = process.env

class MongoDBOperations {
    constructor(collectionName, dbName = MONGO_DB) {
        this.collectionName = collectionName
        this.dbName = dbName
    }

    async insertOne(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)
        return result
    }
    async findItem(filter={}){
        const result=await getClient().db(this.dbName).collection(this.collectionName).findOne(filter)
        return result
    }

  
}

module.exports={MongoDBOperations}