require('dotenv').config();
const { SQL_DB_PRICELIST, PRICESLISTBYSUPPLIERORCLIENT, PRICElISTFORPRODUCTS, ADDITIONSFORDISTANCE, CITIESADDITIONS, TIMEADDITIONS, TRUCKFILL, PUMPS, BUYTONITEMS } = process.env;
const { postData, getData } = require('../../services/axios');

async function getRecordPriceList(entity, condition) {
    try {
        const result = await getData(`/read/readAllEntity/${entity}`, condition)
        return result
    }
    catch (error) {
        throw error
    }
}


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

// חיפוש בטבלת מוצרים וספקים לפי שם טבלה ותאור מוצר

async function getSupplierByNameProduct(nameTable, nameProduct) {
    try {
        let obj = { tableName: nameTable, columns: "Id", condition: `Name='${nameProduct}'` };
        const res = await postData("/read/readTopN", obj);
        arrTemp = []
        if (res.data != undefined) {
            res.data.forEach(element => {
                arrTemp.push(element.Id)
            });
            let obj2 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `ProductId  in (${arrTemp}) And TableName='${nameTable}'` };
            const res2 = await postData("/read/readTopN", obj2);
            arrTemp2 = []
            if (res2.data != undefined) {
                res2.data.forEach(element => {
                    arrTemp2.push(element.PriceListId)
                });
                let obj3 = { tableName: PRICESLISTBYSUPPLIERORCLIENT, columns: "*", condition: `PriceListId  in (${arrTemp2}) ` };
                const res3 = await postData("/read/readTopN", obj3);
                return res3.data;
            }
            else {
                throw new Error('can not found this details');
            }
        }
        else {
            throw new Error('can not found this details');
        }
    }
    catch (error) {
        throw error;
    }
}
// חיפוש בטבלת מוצרים וספקים לפי טבלת מוצרי בטון ולפי שם המוצר
async function getSupplierByNameProductBuyton(nameTable, nameProduct) {
    console.log({ nameTable });
    console.log({ nameProduct });
    try {
        let obj = { tableName: BUYTONITEMS, columns: "*", condition: `ItemDescribe='${nameProduct}'` };
        const res = await postData("/read/readTopN", obj);
        if (res.data != undefined) {
            let obj2 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `TableName='tbl_BuytonStrength' AND ProductId=${res.data[0].ItemStrength}` };
            const res2 = await postData("/read/readTopN", obj2);
            let obj3 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `TableName='tbl_BuytonDegree' AND ProductId=${res.data[0].ItemDegreeExposure}` };
            const res3 = await postData("/read/readTopN", obj3);
            let obj4 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `TableName='tbl_BuytonSomech' AND ProductId=${res.data[0].SomechBuyton}` };
            const res4 = await postData("/read/readTopN", obj4);
            let obj5 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `TableName='tbl_BuytonGrain' AND ProductId=${res.data[0].ItemType}` };
            const res5 = await postData("/read/readTopN", obj5);
            temp = checkValid(res2.data, res3.data)
            temp2 = checkValid(temp, res4.data)
            temp3 = checkValid(temp2, res5.data)
            arrTemp2 = []
            if (temp3 != undefined) {
                temp3.forEach(element => {
                    arrTemp2.push(element.PriceListId)
                });
                let obj3 = { tableName: PRICESLISTBYSUPPLIERORCLIENT, columns: "*", condition: `PriceListId  in (${arrTemp2}) ` };
                const res3 = await postData("/read/readTopN", obj3);
                console.log(res3.data + "            res3.data");
                return res3.data;
            }
        }
    }
    catch (error) {
        throw error;
    }
}
    function checkValid(arr1, arr2) {
        arrTemp = []
        arr1.forEach(b => {
            arr2.forEach(c => {
                if (b.PriceListId === c.PriceListId) {
                    arrTemp.push(b)
                }
            });
        });
        return arrTemp
    }

module.exports = {
    getPriceListByAdditionsForDistance, getNameOfProduvtsById, getPriceListByAdditionsForCities, getPriceListByAdditionsForTime, getPriceListByAdditionsForTruckFill, getSupplierByNameProduct, getSupplierByNameProductBuyton,
    getPriceListByIdSupplierOrClientCode, getAllPriceList, getPriceListById, getPriceListByAddedDate, getPriceListbyProduct, getPriceListByAreaId, getPriceListbySupplierCodeOrClientCode, getPriceListByIdPriceListId
};















