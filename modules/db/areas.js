const { MongoDBOperations } = require('../../services/db/mongo-operations')
const mongo_collection_areas = new MongoDBOperations('areas')

async function insertArea(obj) {
    const result = await mongo_collection_areas.insertOne(obj)
    return result
}

async function findSupplierOrClient(phone) {
    const result = await mongo_collection_areas.findOne(phone)
    return result
}
async function updateSupplierOrClient(phone) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { disable: false } })
    return result
}
async function updateArea(phone, area) {
    const result = await mongo_collection_areas.updateOne(phone
        , { $set: { 'areasList.$[u].delate': true } }, { arrayFilters: [{ 'u.areaName': area }] })
    return result
}
module.exports = { insertArea, findSupplierOrClient, updateSupplierOrClient, updateArea }