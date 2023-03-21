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

module.exports = {insert,selectByConditions,getAllTheContacts}
