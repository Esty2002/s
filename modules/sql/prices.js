const { getConnection, connect, disconnect } = require("../../services/sql/sql-connection");
async function createTable() {
    await connect()
    const result = await getConnection().request().query("CREATE TABLE try (name VARCHAR(255), age VARCHAR(255))")
    disconnect()

}



async function selectAreaAndPriceByItemCode(itemCode) {
    await connect()
    const result = await getConnection().request().query(`SELECT areaName,price FROM price_list WHERE itemCode=${itemCode}`)
    console.log(result.recordset);
    disconnect()
}

async function selectProductAndPricesByAreaName(areaName) {
    await connect()
    const result = await getConnection().request().query(`SELECT itemCode,price FROM price_list WHERE areaName='${areaName}'`)
    console.log(result.recordset);
    disconnect()
}
async function selectProductByAreaName(areaName) {
    await connect()
    const result = await getConnection().request().query(`SELECT itemCode FROM price_list WHERE areaName='${areaName}'`)
    console.log(result.recordset);
    disconnect()
}
async function selectAreaByClientOrSupplyCode(code) {
    await connect()
    const result = await getConnection().request().query(`SELECT areaName FROM price_list WHERE priceListCode=${code}`)
    console.log(result.recordset);
    disconnect()
}

module.exports = { createTable, selectAreaAndPriceByItemCode, selectProductAndPricesByAreaName, selectProductByAreaName, selectAreaByClientOrSupplyCode }