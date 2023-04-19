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
    // async findOne(filter){
    //     const result=await getClient().db(this.dbName).collection(this.collectionName).findOne(filter)
    //     return result
    // }

    // async updateOne(obj){
    //     const result = await getClient().db(this.dbName).collection(this.collectionName).updateOne(obj)
    //     return result

    // }
    async findOneWithProject(filter={}, project={}) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(filter, { projection: project })
        return result
    }

    async findItems(filter = {}, project = {}) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).find(filter, { projection: project }).toArray()
        return result;
    }

    async findOne(filter = {}, elemMatch = {}) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(filter, elemMatch)
        return result
    }
    async updateOne(filter = {}, what = {}, arrayFilters = {}) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).updateOne(filter, what, arrayFilters)
        return result
    }

}



// module.exports = { MongoDBOperations }

const mongo=new MongoDBOperations();
module.exports =  mongo 
