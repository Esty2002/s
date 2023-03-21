require('dotenv').config()
const { MongoDBOperations } = require('../services/db/mongo-operations')
const mongo_collection_areas = new MongoDBOperations('areas')

async function insertArea(obj) {
    let filter = { supplierOrClientCode: obj.supplierOrClientCode }
    let what = obj.areasList
    const result = await mongo_collection_areas.updateOne(filter, { $addToSet: { areas: what } })
    if (result)
        return result
    else
        throw new Error("Can't insert area")
}


async function updateSupplierOrClient(phone) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { disable: false } })
    return result
}


async function findAreaByCode(code,project={}) {
    const result = await mongo_collection_areas.findOneWithProject({ supplierOrClientCode: code },project)
    if (result)
        return JSON.stringify(result)
    else
        throw new Error("not found area")
}


async function updateArea(obj) {

    const result = await mongo_collection_areas.updateOne({ supplierOrClientCode: obj.supplierOrClientCode }, { $set: { 'areas.$[u]': obj.areas } }, { arrayFilters: [{ 'u.areaName': obj.areas.areaName }] })
    if (result)
        return result
    else
        throw new Error('Not Found area to update')

}

async function findSupplierOrClient(code) {
    const result = await mongo_collection_areas.findOne({ supplierOrClientCode: code })
    if (result)
        return result
    else
        throw new Error("not found supplier or client code")
}



async function deleteSupplierOrClient(phone) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { disable: false } })
    if (result)
        return result
    else
        throw new Error('Not Found supplier or client code to delete his areas')
}
async function deleteArea(phone, area) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { 'areas.$[u].delete': true } }, { arrayFilters: [{ 'u.areaName': area }] })
    if (result)
        return result
    else
        throw new Error('Not Found area to delete')

}

module.exports = {
    findAreaByCode,
    updateSupplierOrClient,
    insertArea,
    findSupplierOrClient,
    deleteSupplierOrClient,
    deleteArea,
    updateArea
}
