
require('dotenv').config();
var sql = require('mssql');
const { insert } = require('../../services-quotation/sql/sql-operations');
//פונקציה ליצירת הצעת מחיר חדשה
//שמקבלת אובייקט המכיל את המאפיינים הבאים:
//clientCode, discountPercent,VATPercent,user,comments,contact,payoffDate,closingComments
//ומערך של אובייקטים המכילים את הפריטים המבוקשים
//בפועל dbומחשבת את הנתונים הדרושים,ושולחת לפונקציה שתכניס את הנתונים ל
async function createQuotation(obj) {
    try {
        obj.newQuotation.priceBeforeDiscount = priceBefore(obj.items);
        obj.newQuotation.discount = obj.newQuotation.priceBeforeDiscount * (obj.newQuotation.discountPercent / 100);
        obj.newQuotation.priceAfterDiscount = obj.newQuotation.priceBeforeDiscount - obj.newQuotation.discount;
        obj.newQuotation.VAT = obj.newQuotation.priceAfterDiscount * (obj.newQuotation.VATPercent / 100);
        obj.newQuotation.total = obj.newQuotation.priceAfterDiscount + obj.newQuotation.VAT;
        const result = await insertQuotation(obj);
        return result;
    }
    catch (error) {
        throw new Error("the data is incorrect, at least one parameter was incorrect or incomplete")
    }
}

//פונקציה לחישוב המחיר הכולל ע"פ המחיר של כל הפריטים המבוקשים
function priceBefore(items) {
    sum = 0;
    items.forEach(i => sum += i.price);
    return sum;
}

// dbפונקציה להכנסת הנתונים ל
async function insertQuotation(obj) {
    var tvp_quo = new sql.Table();
    tvp_quo.columns.add('itemCode', sql.Int());
    tvp_quo.columns.add('priceList', sql.Int());
    tvp_quo.columns.add('amount', sql.Int());
    tvp_quo.columns.add('price', sql.Int());
    tvp_quo.columns.add('discount', sql.Int());
    tvp_quo.columns.add('priceAfterDiscount', sql.Int());
    tvp_quo.columns.add('priceChange', sql.Int());
    tvp_quo.columns.add('total', sql.Int());
    tvp_quo.columns.add('addedDate', sql.Date());
    tvp_quo.columns.add('disabled', sql.Int(500));
    tvp_quo.columns.add('disabledDate', sql.Date());

    for (let item of obj.items) {
        tvp_quo.rows.add(item.itemCode, item.priceList, item.amount, item.price, item.discount, item.priceAfterDiscount, item.priceChange, item.total, item.addedDate, item.disabled, item.disabledDate);
    }

    const ans = await insert(obj.newQuotation, tvp_quo);

};

module.exports = {
    createQuotation, insertQuotation
};