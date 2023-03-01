require('dotenv').config()


//take the Alltable according to TableName
async function selectAllTable(tableName){
    await connect()
    const result = await getConnection().request().query(`select * from ${tableName} `)
    console.log(result)
    disconnect()
}

// take the row according to poneNumber and TableName
async function selectAllTable(phoneNumber,tableName){
    await connect()
    const result = await getConnection().request().query(`select * from ${tableName} where phoneNumber= ${phoneNumber}`)
    console.log(result)
    disconnect()
}




module.exports = {
    selectAllTable
}