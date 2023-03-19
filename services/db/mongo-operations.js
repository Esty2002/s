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
    async findItems(filter = {}, project = {}) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).find(filter, { projection: project }).toArray()
        return result;
    }

    async findOne(filter = {}, elemMatch = {}, project = {}) {
        console.log('filter  ', filter);
        // console.log('elemath  ', elemMatch);
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(filter, elemMatch)
        // console.log('mongo---', result);
        return result
    }
    async updateOne(filter = {}, what = {}, arrayFilters = {}) {
        console.log(filter,'  ',what,'  ',arrayFilters);
        const result = await getClient().db(this.dbName).collection(this.collectionName).updateOne(filter, what, arrayFilters)
        console.log('mongo---', result);
        return result
    }
}



module.exports = { MongoDBOperations }
