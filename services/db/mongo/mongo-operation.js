require('dotenv').config()
const {getClient} = require('./mongo_connection')

const { MONGO_DB,COLLECTION_NAME } = process.env

class MongoDBOperations{
    constructor(){
        this.collectionName = COLLECTION_NAME
        this.dbName = MONGO_DB
    }
    async insertOne(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)          
        return result.insertedId
    }
    async findItem(filter = {}, project = {}) {   
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(filter, { projection: project })
        return result
    }
    async update(condition={},update={}) {
        console.log(condition,"condition,update",update,"condition,update");
        const result = await getClient().db(this.dbName).collection(this.collectionName).updateOne(condition,{$set:update})     
        return result
    }
}
  
module.exports = { MongoDBOperations }
