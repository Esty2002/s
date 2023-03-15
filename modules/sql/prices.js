const { getConnection, connect, disconnect } = require("../../services/sql/sql-connection");
async function createTable() {
    await connect()
    const result = await getConnection().request().query("CREATE TABLE priceList (id int IDENTITY(100,1),date date, priceListCode int,areaName varchar(255),itemCode varchar(255),price int,reduction int,primaryAmount int,unitOfMeasure varchar(255),additionDate date, disable int,deleteDate date)")
    disconnect()
}



async function addPriceList(data) {
    console.log("into insert");
    await connect()
    const result = await getConnection().request().query(`INSERT INTO priceS VALUES ('${data.date}','${data.priceListCode}','${data.areaName}','${data.itemCode}','${data.price}','${data.reduction}','${data.primaryAmount}','${data.unitOfMeasure}','${data.additionDate}','${data.disable}','${data.deleteDate}') `)
    disconnect()
    return result
}

async function updatePriceList(date, id) {
    await connect()
    console.log('module  date--', date, 'id--', id);
    const result = await getConnection().request().query(`update priceS set date='${date}' where id='${id}'`)
    console.log("moudle", result.recordset);
    disconnect()
    return result.recordset
}
async function dletePriceList(id) {
    console.log("into update");
    await connect()
    const result = await getConnection().request().query(`update priceS set disable='0' where id='${id}'`)
    disconnect()
    return result
}

async function selectAllAreasByPriceListCodeAndAreaNameAndItemCode(priceListCode, areaName, itemCode) {
    priceListCode = parseInt(priceListCode)
    await connect()
    const result = await getConnection().request().query(`SELECT id,date,priceListCode,areaName,itemCode,price,reduction,primaryAmount,unitOfMeasure FROM priceS WHERE priceListCode='${parseInt(priceListCode)}' AND areaName='${areaName}' AND itemCode='${itemCode}'`)
    console.log('sql----', result.recordset);
    disconnect()
    return (result.recordset)
}

module.exports = {
    createTable,
    addPriceList,
    updatePriceList,
    dletePriceList,
    selectAllAreasByPriceListCodeAndAreaNameAndItemCode
}