require('dotenv').config()
const { getClient } = require('./mongo_connection')

const { MONGO_DB } = process.env

class MongoDBOperations {

    constructor(collectionName, dbName = MONGO_DB) {
        console.log("data name:", dbName);
        this.collectionName = collectionName
        this.dbName = dbName
    }

    async find(filter = {}, project = {}, sort = {}) {
        let s = {}
        s[sort] = 1
        return await getClient().db(this.dbName).collection(this.collectionName).find(filter, { projection: project }).sort(s).toArray()
    }

}

module.exports = { MongoDBOperations }
