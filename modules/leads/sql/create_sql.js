require('dotenv').config()

const { connect, disconnect, getConnection } = require('../../../services/sql/sql-connection')
//take the Alltable according to TableName
async function selectAllTable(tableName) {
    console.log(tableName);

    await connect()
    const result = await getConnection().request().query(`SELECT * FROM  ${tableName}`)
    console.log(result)
    await disconnect()
}

// take the row according to poneNumber and TableName
async function selectRecordByPhoneNumber(phoneNumber, tableName) {
    await connect()
    const result = await getConnection().request().query(`select * from ${tableName} where phone= '${phoneNumber}'`)
    console.log(result)
    await disconnect()
}

async function newOrderer(obj) {
    //send to sql insted of mongodb
    // const result = await mongo_collection_orderers.insertOne(obj)
    return result;
}
async function newPouringType(obj) {
    //send to sql insted of mongodb
    // const result = await mongo_collection_pouring_types.insertOne(obj)
    return result;
}


module.exports = {
    selectAllTable,selectRecordByPhoneNumber ,newOrderer,newPouringType
}