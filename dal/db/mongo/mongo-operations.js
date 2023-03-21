require('dotenv').config()

const { getClient } = require('./mongo-connections')

const { MONGO_DB } = process.env

class MongoDBOperations {
    
    constructor(collectionName, dbName = MONGO_DB) {
        this.collectionName = collectionName;
        this.dbName = dbName;
    }

    async insertOne(obj = {}) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj);
        return result.insertedId;
    }
    async delete(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).deleteOne(obj);
        return result
    }
    
    async updateOne(id,field,value) {
        let change={}
        change[field]=value
        const result = await getClient().db(this.dbName).collection(this.collectionName).updateOne({id:id},{$set:change});
        return result;
    }
    async find(query) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).find(query).toArray();
        return result;
    }

    async findByThing(field,value) {
        let change={}
        change[field]=value
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(change);
        return result;
    }
}

 
const mongoDb=new MongoDBOperations()
module.exports=mongoDb;
    
