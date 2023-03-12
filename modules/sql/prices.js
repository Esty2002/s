const { getConnection, connect, disconnect } = require("../../services/sql/sql-connection");
async function createTable() {
    await connect()
    const result = await getConnection().request().query("CREATE TABLE priceList (id int IDENTITY(100,1),date date, priceListCode int,areaName varchar(255),itemCode varchar(255),price int,reduction int,primaryAmount int,unitOfMeasure varchar(255),additionDate date, disable int,deleteDate date)")
    disconnect()
}

async function addPriceList(data) {
    console.log("into insert");
    await connect()
    const result = await getConnection().request().query(`INSERT INTO priceList VALUES ('${data.date}','${data.priceListCode}','${data.areaName}','${data.itemCode}','${data.price}','${data.reduction}','${data.primaryAmount}','${data.unitOfMeasure}','${data.additionDate}','${data.disable}','${data.deleteDate}') `)
    disconnect()
    return result
}

async function updatePriceList(date,id){
    console.log("into update");
    await connect()
    const result =await getConnection().request().query(`update priceList set date='${date}' where id='${id}'`)
    disconnect()
    return result 
}
async function dletePriceList(id){
    console.log("into update");
    await connect()
    const result =await getConnection().request().query(`update priceList set disable='0' where id='${id}'`)
    disconnect()
    return result 
}

module.exports = { createTable, addPriceList,updatePriceList,dletePriceList }