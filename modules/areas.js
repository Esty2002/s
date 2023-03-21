require('dotenv').config()
const { MongoDBOperations } = require('../services/db/mongo-operations')
const mongo_collection_areas = new MongoDBOperations('areas')

async function insertArea(obj) {
    let filter = { suplierOrClientCode: parseInt(obj.suplierOrClientCode) }
    let what = obj.areas
    console.log('filter--', filter, '  what--', what);
    const result = await mongo_collection_areas.updateOne(filter, { $addToSet: { areas: what } })
    return result
}


async function updateSupplierOrClient(phone) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { disable: false } })
    return result
}


async function findAreaByCode(code) {
    const result = await mongo_collection_areas.findItems({ suplierOrClientCode: code })
    console.log(JSON.stringify(result) + "------rrrrrrrrrrr");
    return result
}


async function updateArea(obj) {

    const result = await mongo_collection_areas.updateOne({ suplierOrClientCode: parseInt(obj.suplierOrClientCode) }, { $set: { 'areas.$[u]': obj.areas } }, { arrayFilters: [{ 'u.areaName': obj.areas.areaName }] })
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
async function deleteSupplierOrClient(phone) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { disable: false } })
    return result
}
async function deleteArea(phone, area) {
    const result = await mongo_collection_areas.updateOne(phone, { $set: { 'areas.$[u].delate': true } }, { arrayFilters: [{ 'u.areaName': area }] })
    return result
}
async function findAreaBySupplierOrClientCode(code, filter) {

    const result = await mongo_collection_areas.findOneWithProject(code, filter)
    return result
}




module.exports = {
    findAreaByCode,
    updateSupplierOrClient,
    insertArea,
    findSupplierOrClient,
    deleteSupplierOrClient,
    deleteArea,
    findAreaOfSupplierOrClient,
    updateArea
    ,findAreaBySupplierOrClientCode
}
