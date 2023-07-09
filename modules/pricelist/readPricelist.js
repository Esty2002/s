require('dotenv').config();
const { SQL_DB_PRICELIST, PRICESLISTBYSUPPLIERORCLIENT, PRICElISTFORPRODUCTS,ADDITIONSFORDISTANCE,CITIESADDITIONS ,TIMEADDITIONS ,TRUCKFILL } = process.env;
const { postData } = require('../../services/axios');

//פונקציית חיפוש שמביאה את כל ההצעות מחיר
async function getAllPriceList() {
    try {
        let obj = { tableName: SQL_DB_PRICELIST, columns: "*", condition: "Disabled=0" };
        const res = await postData("/read/readTopN", obj);
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
        const res = await postData("/read/readandjoin", obj);
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
        const res = await postData("/read/readTopN", obj);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
// פונקציית חיפוש על פי מוצר
async function getPriceListbyProduct(id) {
    try {
        let obj = { tableName: SQL_DB_PRICELIST, columns: "*", condition: `PriceListId='${id}' AND  Disabled=0` };
        const res = await postData("/read/readTopN", obj);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
// פונקציית חיפוש על פי קוד ספק או לקוח
async function getPriceListbySupplierCodeOrClientCode(object) {
    try {
        let obj = { tableName: PRICESLISTBYSUPPLIERORCLIENT, columns: "PriceListId", condition: `SupplierOrClient=${object}` };
        const res = await postData("/read/readTopN", obj);
        console.log(res.data);
        arrTempPriceListId = []
        if (res.data != undefined) {
            res.data.forEach(element => {
                arrTempPriceListId.push(element.PriceListId)
            });
            console.log(arrTempPriceListId);
            let obj2 = { tableName: SQL_DB_PRICELIST, columns: "*", condition: `Id  in (${arrTempPriceListId})` };
            const res2 = await postData("/read/readTopN", obj2);
            console.log(res2.data);
            return res2.data;

        }
        else {
            throw new Error('can not found this city');
        }
    }
    catch (error) {
        throw error;
    }
}
// הפונקציה מקבלת ID אזור ומחזירה הצעת מחיר שקשורה אליו
async function getPriceListByAreaId(object) {
    try {
        let obj = { tableName: PRICESLISTBYSUPPLIERORCLIENT, columns: "PriceListId", condition: `AreaId='${object}'` };
        const res = await postData("/read/readTopN", obj);
        arrTempPriceListId = []
        if (res.data != undefined) {
            res.data.forEach(element => {
                arrTempPriceListId.push(element.PriceListId)
            });
            console.log(arrTempPriceListId);
            let obj2 = { tableName: SQL_DB_PRICELIST, columns: "*", condition: `Id  in (${arrTempPriceListId})` };
            const res2 = await postData("/read/readTopN", obj2);
            console.log(res2.data);
            return res2.data;
        }
        else {
            throw new Error('can not found this city');
        }
    }
    catch (error) {
        throw error;
    }
}
async function getPriceListByIdSupplierOrClientCode(object) {
    console.log(object);
    try {
        let obj = { tableName: PRICESLISTBYSUPPLIERORCLIENT, columns: "*", condition: `PriceListId=${object}` };
        const res = await postData("/read/readTopN", obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
async function getPriceListByIdPriceListId(object) {
    console.log(object);
    try {
        let obj = { tableName: PRICElISTFORPRODUCTS, columns: "*", condition: `PriceListId=${object}` };
        const res = await postData("/read/readTopN", obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
// פונקציה שמחזירה את שם המוצר 
async function getNameOfProduvtsById(object) {
    console.log(object);
    try {
        let obj = { tableName: PRICElISTFORPRODUCTS, columns: "*", condition: `PriceListId=${object}` };
        const res = await postData("/read/foreignkeyvalue", obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
// פונקציה שמחזירה תוספת לפי מרחק
async function getPriceListByAdditionsForDistance(object) {
    console.log(object);
    try {
        let obj = { tableName: ADDITIONSFORDISTANCE, columns: "*", condition: `PriceListId=${object}` };
        const res = await postData("/read/readTopN", obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
// פונקציה שמחזירה תוספת לפי עיר
async function getPriceListByAdditionsForCities(object) {
    console.log(object);
    try {
        let obj = { tableName: CITIESADDITIONS, columns: "*", condition: `PriceListId=${object}` };
        const res = await postData("/read/readTopN", obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
// פונקציה שמחזירה תוספת לפי יום או שעה
async function getPriceListByAdditionsForTime(object) {
    console.log(object);
    try {
        let obj = { tableName: TIMEADDITIONS, columns: "*", condition: `PriceListId=${object}` };
        const res = await postData("/read/readTopN", obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}
//  פונקציה שמחזירה תוספת לפי משאית 
async function getPriceListByAdditionsForTruckFill(object) {
    console.log(object);
    try {
        let obj = { tableName: TRUCKFILL, columns: "*", condition: `PriceListId=${object}` };
        const res = await postData("/read/readTopN", obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        throw error;
    }
}



module.exports = {getPriceListByAdditionsForDistance, getNameOfProduvtsById,getPriceListByAdditionsForCities,getPriceListByAdditionsForTime,getPriceListByAdditionsForTruckFill,
    getPriceListByIdSupplierOrClientCode, getAllPriceList, getPriceListById, getPriceListByAddedDate, getPriceListbyProduct, getPriceListByAreaId, getPriceListbySupplierCodeOrClientCode, getPriceListByIdPriceListId };
