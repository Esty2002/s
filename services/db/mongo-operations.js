require('dotenv').config()
const { getClient } = require('./mongo-connection')

const { MONGO_DB } = process.env


class MongoDBOperations {
    constructor(collectionName, dbName = MONGO_DB) {
        this.collectionName = collectionName
        this.dbName = dbName
    }

    async insertOne(obj = null) {
        let result;
        if (obj) {
            result = await getClient().db(this.dbName).collection(this.collectionName).insertOne(obj)
            result = result.insertedId;
        }
        else {
            result = false;
        }
        return result;
    }
    async find(filter={},project={}){
        const result=await getClient().db(this.dbName).collection(this.collectionName).find(filter,project).toArray();
        return result;
    }
    async countDocuments(){
        const result=await getClient().db(this.dbName).collection(this.collectionName).countDocuments();
        return result;
    }

    async updateOne(obj = {}, filter = {}) {
        const result = await getClient().db(this.dbName).collection(this.collectionName).updateOne(filter, { $set: obj });
        return result;
    }
    async aggregate(filter={},sort={_id:1},skip=0,limit=0,project={_id:1}){
        const result=await getClient().db(this.dbName).collection(this.collectionName).aggregate([{$match:filter},{$sort:sort},{$skip:skip},{$limit:limit},{$project:project}]).toArray();
        return result;
    }
    
}

const mongo = new MongoDBOperations();
module.exports = mongo 
