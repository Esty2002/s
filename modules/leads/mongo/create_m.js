require('dotenv').config()
const  MongoDBOperations = require('../../services/db/mongo-operations')

const { MONGO_COLLECTION_LEADS,MONGO_COLLECTION_ORDERERS,MONGO_COLLECTION_POURING_TYPES } = process.env
const mongo_collection_leads=MongoDBOperations;
mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;

async function createNewLead(obj) {
    const result = await mongo_collection_leads.insertOne(obj)
    return result;
}



module.exports = {createNewLead}