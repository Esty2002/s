const { getConnection, connect, disconnect } = require("../services/sql/sql-connection");
// async function createTable() {
//     await connect()
//     const result = await getConnection().request().query("CREATE TABLE try (name VARCHAR(255), age VARCHAR(255))")
//     disconnect()

// }


async function selectAreaAndPriceByItemCode(itemCode) {
    await connect()
    const result = await getConnection().request().query(`SELECT areaName,price FROM priceList WHERE itemCode=${itemCode}`)
    console.log(result.recordset);
    disconnect()
    return result.recordset

}

async function selectProductAndPricesByAreaName(areaName) {
    await connect()
    const result = await getConnection().request().query(`SELECT itemCode,price FROM priceList WHERE areaName='${areaName}'`)
    console.log(result.recordset);
    disconnect()
    return result.recordset
}
async function selectProductByAreaName(areaName) {
    await connect()
    const result = await getConnection().request().query(`SELECT itemCode FROM priceList WHERE areaName='${areaName}'`)
    console.log(result.recordset);
    disconnect()
    return result.recordset

}
async function selectAreaByClientOrSupplyCode(code) {
    await connect()
    const result = await getConnection().request().query(`SELECT areaName FROM priceList WHERE priceListCode=${code}`)
    console.log(result.recordset);
    disconnect()
    return result.recordset
}


async function selectAllAreasByPriceListCodeAndAreaNameAndItemCode(priceListCode, areaName, itemCode) {
    await connect()
    const result = await getConnection().request().query(`SELECT date,priceListCode,areaName,itemCode,price,reduction,primaryAmount,unitOfMeasure FROM priceList WHERE priceListCode=${priceListCode} AND areaName='${areaName}' AND itemCode=${itemCode}`)
    console.log(result.recordset);
    disconnect()
    return result.recordset
}

module.exports = { selectAreaAndPriceByItemCode, selectProductAndPricesByAreaName, selectProductByAreaName, selectAreaByClientOrSupplyCode, selectAllAreasByPriceListCodeAndAreaNameAndItemCode }