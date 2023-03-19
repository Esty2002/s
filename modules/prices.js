const { getConnection, connect, disconnect } = require("../services/sql/sql-connection");
async function createTable() {
    await connect()
    const result = await getConnection().request().query("CREATE TABLE priceList (id int IDENTITY(100,1),date date, priceListCode int,areaName varchar(255),itemCode varchar(255),price int,reduction int,primaryAmount int,unitOfMeasure varchar(255),additionDate date, disable int,deleteDate date)")
    disconnect()
}



async function addPriceList(data) {
    await connect()
    const result = await getConnection().request().query(`INSERT INTO priceList VALUES ('${data.date}','${data.priceListCode}','${data.areaName}','${data.itemCode}','${data.price}','${data.reduction}','${data.primaryAmount}','${data.unitOfMeasure}','${data.additionDate}','${data.disable}','${data.deleteDate}') `)
    disconnect()
    return result
}

async function updatePriceList(data) {
    await connect()
    const result = await getConnection().request().query(`update priceList set date='${data.date}' where id='${data.id}'`)
    disconnect()
    return result.recordset
}
async function dletePriceList(id) {
    await connect()
    const result = await getConnection().request().query(`update priceList set disable='0' where id='${id}'`)
    disconnect()
    return result
}

async function selectAllAreasByPriceListCodeAndAreaNameAndItemCode(priceListCode, areaName, itemCode) {
    console.log('code-', parseInt(priceListCode), '  area', areaName, '  product', parseInt(itemCode))
    priceListCode = parseInt(priceListCode)
    await connect()
    const result = await getConnection().request().query(`SELECT id,date,priceListCode,areaName,itemCode,price,reduction,primaryAmount,unitOfMeasure FROM priceList WHERE priceListCode='${parseInt(priceListCode)}' AND areaName='${areaName}' AND itemCode='${parseInt(itemCode)}'`)


    console.log('sql----', result.recordset);
    disconnect()
    return (result.recordset)
}

async function selectAreaByClientOrSupplyCode(code) {
    await connect()
    code=parseInt(code)
    const result = await getConnection().request().query(`SELECT distinct areaName FROM priceList WHERE priceListCode=${code}`)
    console.log('code----', code, '  result---', result.recordset);
    disconnect()
    return result.recordset
}

async function selectProductsOfSupplierOrClientByAreaName(code, areaName) {
    console.log('sql');
    await connect()
    const result = await getConnection().request().query(`SELECT itemCode FROM priceList WHERE priceListCode=${code} AND areaName='${areaName}'`)
    console.log(result.recordset);
    disconnect()
    return result.recordset
}
module.exports = {
    createTable,
    addPriceList,
    updatePriceList,
    dletePriceList,
    selectAllAreasByPriceListCodeAndAreaNameAndItemCode,
    selectAreaByClientOrSupplyCode,
    selectProductsOfSupplierOrClientByAreaName
}