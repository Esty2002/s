require('dotenv').config()
const MongoDBOperations = require('../../../services/db/mongo-operations')

const { MONGO_COLLECTION_LEADS, MONGO_COLLECTION_ORDERERS, MONGO_COLLECTION_POURING_TYPES } = process.env
const mongo_collection_leads = MongoDBOperations;
mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;
// const mongo_collection_orderers = new MongoDBOperations(MONGO_COLLECTION_ORDERERS)
// const mongo_collection_pouring_types = new MongoDBOperations(MONGO_COLLECTION_POURING_TYPES)

async function createNewLead(obj = null) {
   
    if ( obj ) {
        result = await mongo_collection_leads.insertOne(obj);
    }

    else {
        result = false;
    }
    return result;
}

async function newOrderer(obj) {
    //send to sql insted of mongodb
    // const result = await mongo_collection_orderers.insertOne(obj)
    return result;
}

async function newPouringType(obj) {
    //send to sql insted of mongodb
    // const result = await mongo_collection_pouring_types.insertOne(obj)
    return result;
}

module.exports = {
    createNewLead,
    newOrderer,
    newPouringType
}