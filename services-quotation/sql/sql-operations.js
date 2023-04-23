const { getConnection, connect, disconnect } = require('./sql-connection');

// קריאת נתונים מבסיס הנתונים לפי תנאים,
// פונקציה זו מקבלת ערך - מאיזו טבלה לפלטר ומחרוזת תנאים או תנאי 
async function selectByConditions(table,conditionsString) {
    await connect();
    const result = await getConnection().request().query(`SELECT * FROM ${table} WHERE ${conditionsString} `);
    disconnect;
    return result;
};

//this function return the list of the contacts from the quotation table
async function getAllTheContacts(){
    await connect();
    const result = await getConnection().request().query('SELECT CONTACT FROM QUOTATION ');
    disconnect()
    return result;
}


async function insert(obj,table) {
    await connect()
    const result = await getConnection().request()
    .input('tbl_QuotationItems',table)
    .input('clientCode',obj.clientCode)
    .input('date',obj.date)
    .input('priceBeforeDiscount',obj.priceBeforeDiscount)
    .input('discountPercent',obj.discountPercent)
    .input('discount',obj.discount)
    .input('priceAfterDiscount',obj.priceAfterDiscount)
    .input('VATPercent',obj.VATPercent)
    .input('VAT',obj.VAT)
    .input('total',obj.total)
    .input('userName',obj.userName)
    .input('comments',obj.comments)
    .input('contact',obj.contact)
    .input('payoffDate',obj.payoffDate)
    .input('closingComments',obj.closingComments)
    .input('addedDate',obj.addedDate)
    .input('disabled',obj.disabled)
    .input('disabledDate',obj.disabledDate)
    .execute('Proc_insertQuoatation')
    disconnect()
    console.log("result", result);
    return result
}


async function getCode(code) {
    await connect()
    const result = await getConnection().request().query(`select price from quotationItems where serialNumber=${code} `)
    console.log(result)
    disconnect()
    return result.recordsets[0][0]
}

async function del(obj = null) {
    await connect()
    const result = await getConnection().request().query(`
    declare @cou int    
    set @cou=(select quotationCode from quotationItems where serialNumber=${obj.code})   
    select @cou as qCode
    DELETE FROM ${obj.table} WHERE ${obj.according}=${obj.code}
    select count(*) as count from quotationItems where quotationCode=@cou     
    `)
    console.log(result)
    disconnect()
    return result.recordsets
}

async function update(obj = null) {
    await connect()
    const result = await getConnection().request().query(`
    declare @cou int 
    set @cou=(select quotationCode from quotationItems where serialNumber=${obj.code})
    select @cou as qCode
     UPDATE ${obj.table} SET ${obj.all} WHERE ${obj.according}=${obj.code}  
     select count(*) as count from quotationItems where quotationCode=@cou AND disabled=0 
     `)
    console.log(result)
    disconnect()
    // return result.recordsets[0][0]
    return result.recordsets

}

async function updateQuotation(val) {
    console.log(val);
    await connect()
    const result = await getConnection().request().input('qc', val).execute('updateQuotation')
    console.log(result)
    disconnect()
    return result
}

async function postComment(obj = null) {
    await connect()
    const result = await getConnection().request().query(`UPDATE quotationItems SET price=${obj.price} WHERE serialNumber=${obj.code} AND disabled=0`)
    console.log(result)
    disconnect()
    return result
}

async function insertItem(obj = null) {
    await connect()
    const result = await getConnection().request().query(`INSERT INTO ${obj.table} VALUES (${obj.quotationCode},${obj.rowNumber},${obj.itemCode},${obj.priceList},${obj.amount},${obj.price},${obj.discount},${obj.priceAfterDiscount},${obj.priceChange},${obj.total},'${obj.addedDate}',${obj.disabled},'${obj.disabledDate}')`)
    console.log(result)
    disconnect()
    // return result
}


async function updateAll(serialNumber) {
    await connect()
    const result = await getConnection().request().input('serialNumber', serialNumber).execute('Proc_updateQuotation')
    await disconnect()
    return result
}
async function deleteAll(serialNumber) {
    await connect()
    const result = await getConnection().request().input('serialNumber', serialNumber).execute('Proc_deleteQuotation')
    disconnect()
    return result
}



module.exports = {selectByConditions,deleteAll,updateAll,
    insert,postComment,updateQuotation,update,
    getAllTheContacts,getCode,del,insertItem}
