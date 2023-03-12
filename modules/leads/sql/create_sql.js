require('dotenv').config()

const { connect, disconnect, getConnection } = require('../../../services/sql/sql-connection')
//take the Alltable according to TableName
async function selectAllTable(tableName) {
    console.log(tableName)
    let result
    try {
        await connect()
        result = await getConnection().request().query(`SELECT * FROM  ${tableName}`)
        await disconnect()
    }
    catch {
        result="the table name is not defiend"
    }

    return result;
}

// take the row according to poneNumber and TableName
async function selectRecordByPhoneNumber(phoneNumber, tableName) {
    let result
    try{
        await connect()
         result = await getConnection().request().query(`select * from ${tableName} where phone= '${phoneNumber}'`)
        await disconnect()
    }
    catch{
       result="the tableName or phoneNumber dont defined"
    }
    return result;

}


// async function addNewLead(obj) { 
//     await connect()
//     const result = await getConnection().request().query(`INSERT INTO statusLead VALUES( ${obj.id},'${obj.status}')`)
//     await disconnect()
// }

module.exports = {
    selectAllTable, selectRecordByPhoneNumber
}