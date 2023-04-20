require('dotenv').config()
const MongoDBOperations = require('../../services-leads/db/mongodb/mongo-operations')

const { MONGO_COLLECTION_LEADS, MONGO_COLLECTION_PRODUCTS } = process.env
const mongo_collection_leads = MongoDBOperations;
const mongo_collection_products = MongoDBOperations;
const createNewLead = async (obj = null) => {
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;
    let result;
    if (obj&&obj.supplyDate) {
        obj.serialNumber = await mongo_collection_leads.countDocuments();
        obj.serialNumber += 1;
        obj.disable = false;
        obj.leadStatus = "חדש"
        result = await mongo_collection_leads.insertOne(obj);
    }
    else {
        throw new Error("the obj not received")
    }
    return result;
}
const getTheMustConcretItem = async () => {
    mongo_collection_products.collectionName = MONGO_COLLECTION_PRODUCTS;
    const filter = { must: true };
    const project = { _id: 0, traitName: 1, values: 1 };
    let result = await mongo_collection_products.find(filter, project);
    return result;
}


const updateLead = async (obj = null, filter = null) => {
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;
    let result;
    if (filter && obj) {
        result = await mongo_collection_leads.updateOne(obj, filter);

    }
    else {
        throw new Error("the obj or filter are not defined");
    }

    return result;
}



const allLeadsDetails = async ({ filter, sort, skip, limit, project }) => {
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;
    const result = await mongo_collection_leads.aggregate(filter, sort, skip, limit, project);
    return result;
}
const changeLeadToOrder = async (serialNumber) => {
    mongo_collection_leads.collectionName = MONGO_COLLECTION_LEADS;
    const resultUpdate = await mongo_collection_leads.updateOne(serialNumber, { disable: true, leadStatus: "old" });
    const resultDetails = await mongo_collection_leads.find(serialNumber, {});
    // כאן צריך להשתמש בפונקציה שמכניסה הזמנה חדשה ולשלוח לה את כל הנתונים שהתקבלו מהמונגו ולקבל את מספר ההזמנה ואחר כך לעדכן במונגו את מספר ההזמנה שיצא
    return "success";

}








module.exports = { createNewLead, allLeadsDetails, getTheMustConcretItem, updateLead, changeLeadToOrder }
