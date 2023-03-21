const { getConnection, connect, disconnect } = require('./sql-connection');


async function del(obj = null) {
    await connect()
    const result = await getConnection().request().query(`DELETE FROM ${obj.table} WHERE ${obj.according} = ${obj.code}`)
    disconnect()
    return result
}

async function deleteAll(serialNumber) {
    await connect()
    const result = await getConnection().request().input('serialNumber', serialNumber).execute('Proc_deleteQuotation')
    disconnect()
    return result
}

async function update(obj = null) {
    await connect()
    const result = await getConnection().request().query(`UPDATE ${obj.table} SET ${obj.all} WHERE ${obj.according}=${obj.code}`)
    await disconnect()
    return result
}

async function updateAll(serialNumber) {
    await connect()
    const result = await getConnection().request().input('serialNumber', serialNumber).execute('Proc_updateQuotation')
    await disconnect()
    return result
}

async function createQuatationTable() {
    await connect()
    const result = await getConnection().request().query(`CREATE TABLE quotation
    (serialNumber int IDENTITY(1000,1) NOT NULL,
    clientCode int NOT NULL,  date Date NULL,
    priceBeforeDiscount int NOT NULL ,
    discountPercent int NULL,discount int NOT NULL,
    priceAfterDiscount int NOT NULL,
    VATPercent int NOT NULL,
    VAT int NOT NULL,
    total int NOT NULL,
    userName int NOT NULL,
    comments nvarchar(1000) NULL,
    contact varchar(255) NULL,
    payoffDate Date NULL,
    closingComments nvarchar(1000) NULL,
    addedDate Date NOT NULL,
    disabled int NOT NULL,
    disabledDate Date NULL)`)
    disconnect()
}

async function createQuatationItamsTable() {
    await connect()
    const result = await getConnection().request().query(`CREATE TABLE quotationItems
    (serialNumber int IDENTITY(1000,1) NOT NULL,
        quotationCode int NOT NULL,
        rowNumber int NOT NULL,
        itemCode int NOT NULL,
        priceList int NOT NULL,
        amount int NOT NULL,
        price int NOT NULL,
        discount int NULL,
        priceAfterDiscount int NOT NULL,
        priceChange int NULL,
        total int NOT NULL,
        addedDate Date NOT NULL,
        disabled int NOT NULL,
        disabledDate Date NULL)`)
    disconnect()
}






module.exports = { createQuatationTable, createQuatationItamsTable, del, update, deleteAll, updateAll }