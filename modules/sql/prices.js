const { getConnection, connect, disconnect } = require("../../services/sql/sql-connection");
async function createTable() {
    await connect()
    const result = await getConnection().request().query("CREATE TABLE try (name VARCHAR(255), age VARCHAR(255))")
    disconnect()

}



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


async function selectAllAreas(){
    await connect()
    const result = await getConnection().request().query('SELECT areaName FROM priceList')
    console.log(result.recordset);
    disconnect()
    return result.recordset
}

module.exports = { createTable, selectAreaAndPriceByItemCode, selectProductAndPricesByAreaName, selectProductByAreaName, selectAreaByClientOrSupplyCode,selectAllAreas }