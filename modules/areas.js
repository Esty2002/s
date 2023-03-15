require('dotenv').config()
const {MongoDBOperations  } = require('../services/db/mongo-operation')



const mongo_collection_areas = new MongoDBOperations('Areas')

// async function insertArea(obj) {
//     const result = await mongo_collection_areas.insertOne(obj)
//     return result
// }

// async function findSupplierOrClient(phone) {
//     const result = await mongo_collection_areas.findItem(phone)
//     return result
// }


async function findAreaByCode(code){
    const result=await mongo_collection_areas.findItem({SupperlierOrClientCode:code},{_id:0,areasList:1})
    console.log(JSON.stringify(result)+"------rrrrrrrrrrr");
    return result
}

module.exports = { findAreaByCode}