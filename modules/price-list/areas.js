require('dotenv').config()
const  mongoDBOperations  = require('../../services-price-list/db/mongo/mongo-operations')


async function insertArea(obj={}) {
    mongo_collection_areas.collectionName=MONGO_COLLECTION_AREAS
    let filter = { supplierOrClientCode: obj.supplierOrClientCode }
    let what = obj.areasList
    const result = await mongo_collection_areas.updateOne(filter, { $addToSet: { areas: what } })
    if (result)
        return result
    else
        throw new Error("Can't insert area")
    
}


async function updateSupplierOrClient(phone) {
    mongo_collection_areas.collectionName=MONGO_COLLECTION_AREAS

    const result = await mongo_collection_areas.updateOne(phone, { $set: { disable: false } })
    return result
}


async function findAreaByCode(code,project={}) {

    mongo_collection_areas.collectionName=MONGO_COLLECTION_AREAS
    const result = await mongo_collection_areas.findOneWithProject({ supplierOrClientCode: code },project)
    if (result)
        return JSON.stringify(result)
    else
        throw new Error("not found area")
}


async function updateArea(obj={}) {
    mongo_collection_areas.collectionName=MONGO_COLLECTION_AREAS

    const result = await mongo_collection_areas.updateOne({ supplierOrClientCode: obj.supplierOrClientCode }, { $set: { 'areas.$[u]': obj.areas } }, { arrayFilters: [{ 'u.areaName': obj.areas.areaName }] })
    if (result)
        return result
    else
        throw new Error('Not Found area to update')

}

async function findSupplierOrClient(code) {

    mongo_collection_areas.collectionName=MONGO_COLLECTION_AREAS
    code=parseInt(code)
    const result = await mongo_collection_areas.findOne({ supplierOrClientCode: code })
    if (result)
        return result

    else
        throw new Error("not found supplier or client code")
}





module.exports = {
    findAreaByCode,
    updateSupplierOrClient,
    insertArea,
    findSupplierOrClient,
    updateArea
}
