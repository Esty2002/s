const { getConnection, connect, disconnect } = require("../services/sql/sql-connection");
async function createTable() {
    await connect()
    const result = await getConnection().request().query("CREATE TABLE priceList (id int IDENTITY(100,1),date date, priceListCode int,areaName varchar(255),itemCode varchar(255),price int,reduction int,primaryAmount int,unitOfMeasure varchar(255),additionDate date, disable int,deleteDate date)")
    disconnect()
}

// async function addUser() {
//     let name = "shani"
//     let age = 20
//     await connect()
//     const result = await getConnection().request().query(`insert into try values ('${name}','${age}' )`)
//     console.log(result)
//     disconnect()

// }

// async function selectUserByUsername(username) {
//     await connect()
//     const result = await getConnection().request().query(`select * from try where name = '${username}'`)
//     console.log(result)
//     disconnect()
//     if (result) {
//         return true
//     }
//     return false
// }

async function addPriceList(data) {
    await connect()
    let befor = await getConnection.request.query('select top 1 *from priceList  ORDER BY  id DESC')
    const result = await getConnection().request().query(`INSERT INTO priceList VALUES ('${data.date}','${data.priceListCode}','${data.areaName}','${data.itemCode}','${data.price}','${data.reduction}','${data.primaryAmount}','${data.unitOfMeasure}','${data.additionDate}','${data.disable}','${data.deleteDate}') `)
    let after = await getConnection.request.query('select top 1 *from priceList  ORDER BY  id DESC')
    disconnect()
    if (befor != after)
        return true
    return false
}

async function updatePriceList(data){
    await connect()
    const result =await getConnection.request.query(`update priceList set date='${data.date}' where id='${data.id}'`)
    disconnect()
    return result 
}

module.exports = { createTable, addPriceList,updatePriceList }