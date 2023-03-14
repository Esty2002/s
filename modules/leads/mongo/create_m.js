require('dotenv').config()
const MongoDBOperations = require('../../../services/db/mongo-operations')

const { MONGO_COLLECTION_LEADS, MONGO_COLLECTION_PRODUCTS } = process.env
const mongo_collection_leads = MongoDBOperations;
const mongo_collection_products = MongoDBOperations;
const createNewLead = async (obj = null) => {
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;

    let result;
    if (obj) {
        result = await mongo_collection_leads.insertOne(obj);
    }
    else {
        result = false;
    }
    return result;
}
const getTheMastConcretItem = async () => {
    mongo_collection_products.collectionName = MONGO_COLLECTION_PRODUCTS

    const filter = { must: true };
    const project = { _id: 0, traitName: 1, values: 1 }
    let result = await mongo_collection_products.find(filter, project);
    return result;
}

module.exports = { createNewLead, getTheMastConcretItem }
