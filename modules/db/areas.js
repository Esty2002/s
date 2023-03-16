const { MongoDBOperations } = require('../../services/db/mongo-operations')
const mongo_collection_areas = new MongoDBOperations('areas')

async function insertArea(obj) {
        let filter = { suplierOrClientCode:parseInt(obj.suplierOrClientCode) }
        let what = obj.areas
        const result = await mongo_collection_areas.updateOne(filter, what )
        return result

}

async function findSupplierOrClient(code) {
    const result = await mongo_collection_areas.findOne({ suplierOrClientCode: code })
    return result
}

async function findAreaOfSupplierOrClient(code, areaName) {
    // findOne({ suplierOrClientCode: 1234 }, {areas: {$elemMatch: {areaName: 'uuu' }}})


    const result = await mongo_collection_areas.findOne({ suplierOrClientCode: code }, `{areas:{$elemMatch:{areaName:${areaName}}}}`)
    return result
}
async function updateSupplierOrClient(phone) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { disable: false } })
    return result
}
async function updateArea(phone, area) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { 'areasList.$[u].delate': true } }, { arrayFilters: [{ 'u.areaName': area }] })
    return result
}
module.exports = {
    insertArea,
    findSupplierOrClient,
    updateSupplierOrClient,
    updateArea,
    findAreaOfSupplierOrClient
}