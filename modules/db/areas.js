const { MongoDBOperations } = require('../../services/db/mongo-operations')
const mongo_collection_areas = new MongoDBOperations('areas')

async function insertArea(obj) {
    console.log('kkk');
    let exist = await findSupplierOrClient(obj.suplierOrClientCode)
    if (exist) {
        // let existArea = await findAreaOfSupplierOrClient(obj.suplierOrClientCode, obj.areas.areaName)
        // if (!existArea) {
        // { suplierOrClientCode: '1234', areas: { areaName: 'dsd', point: { x: 20, y: 50 }, radius: '0' } }
        let filter = { suplierOrClientCode:parseInt( obj.suplierOrClientCode) }
        let what = obj.areas
            // `{$addToSet:{areas:{${obj.areas}}}}`
        console.log(filter, '--------', what);

        const result = await mongo_collection_areas.updateOne(filter, { $addToSet: { areas: what } })
        console.log('yeeeeeeeeeeessssssssss');
        return result
        // }
        // else
    }
}

async function findSupplierOrClient(code) {
    const result = await mongo_collection_areas.findOne({ suplierOrClientCode: code })
    console.log('module---', result);
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
    const result = await mongo_collection_areas.updateOne(phone
        , { $set: { 'areasList.$[u].delate': true } }, { arrayFilters: [{ 'u.areaName': area }] })
    return result
}
module.exports = {
    insertArea,
    findSupplierOrClient,
    updateSupplierOrClient,
    updateArea,
    findAreaOfSupplierOrClient
}