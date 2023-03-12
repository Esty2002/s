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


// async function addNewLead(obj) { 
//     await connect()
//     const result = await getConnection().request().query(`INSERT INTO statusLead VALUES( ${obj.id},'${obj.status}')`)
//     await disconnect()
// }

module.exports = {
    selectAllTable,selectRecordByPhoneNumber 
}