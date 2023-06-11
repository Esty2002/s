require('dotenv').config();
const { SQL_DB_PRICELIST} = process.env;
const {  postData, sqlServer } = require('../../services/axios');

//פונקציית חיפוש שמביאה את כל ההצעות מחיר
async function getAllPriceList() {
    try {
        let obj = { tableName: SQL_DB_PRICELIST, columns: "*", condition: "Disabled=0" };
        const res = await postData(sqlServer, "/read/readTopN", obj);
        return res.data;
    }
    catch (error) {
        throw new Error('can not get all pricelist');
    }
}
// חיפוש הצעת מחיר לפי ID
async function getPriceListById(object) {
//  ומחזירה את כל השורות בטבלאות שמחוברות אליו ID מקבלת 
    try {
        let obj = { tableName: SQL_DB_PRICELIST, columns: "*", condition: `id='${object.id}' AND  Disabled=0` };
        const res = await postData(sqlServer, "/read/readandjoin", obj);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
// פונקצית חיפוש הצעת מחיר לפי תאריך הוספה
async function getPriceListByAddedDate(object) {
    try {
        let obj = { tableName: SQL_DB_PRICELIST, columns: "*", condition: `id='${object.id}' AND  Disabled=0` };
        const res = await postData(sqlServer, "/read/readTopN", obj);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
// פונקציית חיפוש על פי מוצר
async function getPriceListbyProduct(object) {
    try {
        let obj = { tableName: SQL_DB_PRICELIST, columns: "*", condition: `id='${object.id}' AND  Disabled=0` };
        const res = await postData(sqlServer, "/read/readTopN", obj);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}

// הפונקציה מקבלת ID אזור ומחזירה הצעת מחיר שקשורה אליו
async function GetPriceListByAreaId(object) {
    try {
        let obj = { tableName: PRICESLISTBYSUPPLIERORCLIENT, columns: "PriceListId", condition: `AreaId='${object}'` };
        const res = await postData(sqlServer, "/read/readTopN", obj);
        let obj2 = { tableName: SQL_DB_PRICELIST, columns: "*", condition: `PriceListId='${res2.data}'` };
        const res2 = await postData(sqlServer, "/read/readTopN", obj);
        
        return res2.data;
    }
    catch (error) {
        throw error;
    }
}



module.exports = { getAllPriceList,getPriceListById ,getPriceListByAddedDate,getPriceListbyProduct,GetPriceListByAreaId};
