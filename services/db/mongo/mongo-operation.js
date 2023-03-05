require('dotenv').config()
const {getClient} = require('./mongo_connection')

const { MONGO_DB } = process.env

class MongoDBOperations{
    constructor(collectionName,dbName=MONGO_DB){
        console.log("data name:", dbName);
        this.collectionName = collectionName
        this.dbName = dbName
    }
}

module.exports = { MongoDBOperations }
