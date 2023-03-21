const { getConnection, connect, disconnect } = require("../services/sql/sql-connection");
const { selectFromSql, addToSql, updateInSql } = require('../services/sql/sql-operations')

//  sql-פונקציה שיוצרת את הטבלה של המחירונים ב
async function createTable() {
    await connect()
    const result = await getConnection().request().query(`CREATE TABLE priceList (id int IDENTITY(100,1),
    date date,
     priceListCode int,
     areaName varchar(255),
     itemCode varchar(255),
     price int,reduction int,
     primaryAmount int,
     unitOfMeasure varchar(255),
     additionDate date,
     disable int,
     deleteDate date)`)
    await disconnect()
}

//פןנקציה שמכניסה נתונים לטבלת המחירונים
async function addPriceList(data) {
    await connect()
    const result = await getConnection().request().query(`INSERT INTO priceList VALUES 
    ('${setTheDateForSql(data.date)}',
    '${parseInt(data.priceListCode)}',
    '${data.areaName}','${data.itemCode}',
    '${parseInt(data.price)}',
    '${parseInt(data.reduction)}',
    '${parseInt(data.primaryAmount)}',
    '${data.unitOfMeasure}',
    '${setTheDateForSql(data.additionDate)}',
    '${parseInt(data.disable)}',
    '${setTheDateForSql(data.deleteDate)}') `)
    await disconnect()
    return result.rowsAffected
}

//פונקציה שמעדכנת את התאריך שבו המחירון נכנס לתוקף
async function updatePriceList(data) {
    await connect()
    const result = await getConnection().request().query(`update priceList set date='${data.date}' where id='${data.id}'`)
    await disconnect()
    return result.rowsAffected
}

//   ל -1disable פןנקציה שמוחקת מחירון כלומר מעדכנת את הערך 
async function dletePriceList(id) {
    await connect()
    const result = await getConnection().request().query(`update priceList set disable='0' where id='${id}'`)
    await disconnect()
    return result.rowsAffected
}


//sql פונקציה שמקבלת תאריך ועורכת אותו בהתאמה ל-דרישות
function setTheDateForSql(date) {
    console.log(date, "-----------------");
    let newDate = new Date(date).toISOString().split("T").join(" ").split("Z")
    return newDate[0]
}















async function selectAreaAndPriceByItemCode(condition) {
    const result = await selectFromSql('areaName,price', 'priceList', `itemCode=${condition.code}`)
    console.log("chavi  ",result);
    return result

}


async function selectProductByAreaName(condition,flag) {
    let result;
    if (flag) {
         result = await selectFromSql('itemCode,price', 'priceList', `areaName='${condition.area}'`)
    }
    else {
         result = await selectFromSql('itemCode', 'priceList', `areaName='${condition.area}'`)

    }
    return result;
}

async function selectAreaByClientOrSupplyCode(condition) {

    const result = await selectFromSql('distinct areaName', 'priceList', `priceListCode=${condition.code}`)
    return result;


}


async function selectAllAreasByPriceListCodeAndAreaNameAndItemCode(condition) {

    const result = await selectFromSql('id,priceListCode,areaName,itemCode,price,reduction,primaryAmount,unitOfMeasure', 'priceList', `priceListCode='${condition.code}' AND areaName='${condition.area}' AND itemCode=${parseInt(condition.productCode)}`)
    return result;


}
async function selectProductsOfSupplierOrClientByAreaName(condition) {

    const result = await selectFromSql('itemCode', 'priceList', `priceListCode=${condition.code} AND areaName='${condition.areaName}'`)
    return result
}

module.exports = {
    createTable,
    addPriceList,
    updatePriceList,
    dletePriceList,
    selectAllAreasByPriceListCodeAndAreaNameAndItemCode,
    selectAreaByClientOrSupplyCode,
    selectProductsOfSupplierOrClientByAreaName,
    setTheDateForSql,
    selectAreaAndPriceByItemCode,
    selectProductByAreaName
}
