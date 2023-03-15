require('dotenv').config()
const MongoDBOperations = require('../../../services/db/mongo-operations')

const { MONGO_COLLECTION_LEADS, MONGO_COLLECTION_PRODUCTS } = process.env
const mongo_collection_leads = MongoDBOperations;
const mongo_collection_products = MongoDBOperations;
const createNewLead = async (obj = null) => {
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;

    let result;
    if (obj) {
        obj.serialNumber=await mongo_collection_leads.countDocuments();
        obj.serialNumber+=1;
        console.log('serialNum:'+obj.serialNumber);
        obj.disable=false;
        result = await mongo_collection_leads.insertOne(obj);
    }
    else {
        result = false;
    }
    return result;
}
const getTheMustConcretItem = async () => {
    mongo_collection_products.collectionName = MONGO_COLLECTION_PRODUCTS
    const filter = { must: true };
    const project = { _id: 0, traitName: 1, values: 1 }
    let result = await mongo_collection_products.find(filter, project);
    return result;
}


const updateLead = async (obj = {}) => {
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;

   const  result = await mongo_collection_leads.updateOne(obj ,obj.serialNumber)
   return result
}



async function AllLeadsDetails (){
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;

    const result= await mongo_collection_leads.find({disable:false},{_id:0,phoneOrderer:1,supplyAdress:1,supplyDate:1,serialNumber:1})
    return result
}
async function leadsbyserialnumber(serialNumber1){
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;
    
    const  result = await mongo_collection_leads.find({disable:false,serialNumber:parseInt(serialNumber1)},{})
    return result
}

module.exports = { createNewLead ,AllLeadsDetails,getTheMustConcretItem,updateLead,leadsbyserialnumber}
