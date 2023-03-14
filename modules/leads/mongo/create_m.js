require('dotenv').config()
const MongoDBOperations = require('../../../services/db/mongo-operations')

const { MONGO_COLLECTION_LEADS} = process.env
const mongo_collection_leads = MongoDBOperations;
mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;

const createNewLead = async (obj = null) => {
    if (obj) {
        result = await mongo_collection_leads.insertOne(obj);
    }
    else {
        result = false;
    }
    return result;
}
async function AllLeadsDetails (){
    const result= await mongo_collection_leads.find({disable:false},{id:0,phoneOrderer:1,supplyAdress:1,supplyDate:1,disable:0})
    console.log('```````````````````````````````````');
    console.log(result[0]);
    return result
}
module.exports = { createNewLead ,AllLeadsDetails}
