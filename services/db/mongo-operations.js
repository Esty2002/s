const { getClient } = require('./mongo-connection')

const MONGO_DB = 'Byton'

class MongoDBOperations {
    constructor(collectionName, dbName = MONGO_DB) {
        this.collectionName = collectionName
        this.dbName = dbName
    }

    async insertOne(obj) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)
        return result
    }
    async findOne(filter = {}, elemMatch = {}, project = {}) {
        console.log('filter  ', filter);
        // console.log('elemath  ', elemMatch);
        const result = await getClient().db(this.dbName).collection(this.collectionName).findOne(filter, elemMatch)
        // console.log('mongo---', result);
        return result
    }
    async updateOne(filter, what) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).updateOne(filter, { $addToSet: { areas: what } })
        return result
    }
}
// {
//     '$addToSet': { areas: { areaName: 'bbbb', point: {x:10,y:50}, radius: '0' } }
//   }

module.exports = { MongoDBOperations }