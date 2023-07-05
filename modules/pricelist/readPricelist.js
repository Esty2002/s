require('dotenv').config();
const { SQL_DB_PRICELIST, PRICESLISTBYSUPPLIERORCLIENT, PRICElISTFORPRODUCTS, ADDITIONSFORDISTANCE, CITIESADDITIONS, TIMEADDITIONS, TRUCKFILL, PUMPS, BUYTONITEMS } = process.env;
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
async function getPriceListbyProduct(object) {
    try {
        let obj = { tableName: SQL_DB_PRICELIST, columns: "*", condition: `id='${object.id}' AND  Disabled=0` };
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

// חיפוש ספק ואזור לפי מוצר
async function getSupplierByNameProduct(nameTable, nameProduct) {
    console.log({ nameTable });
    console.log({ nameProduct });
    try {
        let obj = { tableName: nameTable, columns: "Id", condition: `Name='${nameProduct}'` };
        const res = await postData("/read/readTopN", obj);
        arrTemp = []
        if (res.data != undefined) {
            res.data.forEach(element => {
                arrTemp.push(element.Id)
            });
            console.log(arrTemp);
            let obj2 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `ProductId  in (${arrTemp}) And TableName='${nameTable}'` };
            const res2 = await postData("/read/readTopN", obj2);
            arrTemp2 = []
            if (res2.data != undefined) {
                res2.data.forEach(element => {
                    arrTemp2.push(element.PriceListId)
                });
                let obj3 = { tableName: PRICESLISTBYSUPPLIERORCLIENT, columns: "*", condition: `PriceListId  in (${arrTemp2}) ` };
                const res3 = await postData("/read/readTopN", obj3);
                console.log(res3.data);
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

async function getSupplierByNameProductBuyton(nameTable, nameProduct) {
    console.log({ nameTable });
    console.log({ nameProduct });
    try {
        let obj = { tableName: BUYTONITEMS, columns: "*", condition: `ItemDescribe='${nameProduct}'` };
        const res = await postData("/read/readTopN", obj);
        console.log(res.data);
        if (res.data != undefined) {
            let obj2 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `TableName='tbl_BuytonStrength' AND product=${res.data[0].ItemStrength}` };
            const res2 = await postData("/read/readTopN", obj2);
            let obj3 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `TableName='tbl_BuytonDegree' AND product=${res.data[0].ItemDegreeExposure}` };
            const res3 = await postData("/read/readTopN", obj3);
            let obj4 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `TableName='tbl_BuytonSomech' AND product=${res.data[0].SomechBuyton}` };
            const res4 = await postData("/read/readTopN", obj4);
            let obj5 = { tableName: PRICElISTFORPRODUCTS, columns: "PriceListId", condition: `TableName='tbl_BuytonGrain' AND product=${res.data[0].ItemType}` };
            const res5 = await postData("/read/readTopN", obj5);
            temp = checkValid(res2.data, res3.data)
            temp2 = checkValid(temp, res4.data)
            temp3 = checkValid(temp2, res5.data)

            console.log(res2.data);
            console.log(res3.data);
            console.log(res4.data);
            console.log(res5.data);
            if (res2.data[0] === res3.data[0] && res4.data[0] === res5.data[0] && res2.data[0] === res4.data[0]) {
                let obj6 = { tableName: PRICESLISTBYSUPPLIERORCLIENT, columns: "*", condition: `PriceListId  in (${temp3}) ` };
                const res3 = await postData("/read/readTopN", obj6);
                console.log(res3.data);
                return res3.data;
            }
        }

        return res.data;
    }
    catch (error) {
        throw error;
    }
    function checkValid(arr1, arr2) {
        arrTemp = []
        arr1.forEach(b => {
            arr2.forEach(c => {
                if (b === c) {
                    arrTemp.push
                }
            });
        });
        return arrTemp
    }
}

module.exports = {
    getPriceListByAdditionsForDistance, getNameOfProduvtsById, getPriceListByAdditionsForCities, getPriceListByAdditionsForTime, getPriceListByAdditionsForTruckFill, getSupplierByNameProduct, getSupplierByNameProductBuyton,
    getPriceListByIdSupplierOrClientCode, getAllPriceList, getPriceListById, getPriceListByAddedDate, getPriceListbyProduct, getPriceListByAreaId, getPriceListbySupplierCodeOrClientCode, getPriceListByIdPriceListId
};

















//בדיקות תקינות של מוצרי בטון
 //     console.log(res.data[0].ItemStrength + "           ItemStrength");
            // let obj2 = { tableName: 'tbl_BuytonStrength', columns: "*", condition: `StrengthNumber=${res.data[0].ItemStrength}` };
            //     const res2 = await postData("/read/readTopN", obj2);
            //     console.log(res2.data);
            //     if (res2.data != undefined) {
            //         console.log(res.data[0].ItemDegreeExposure + "           ItemDegreeExposure");
            //         let obj3 = { tableName: 'tbl_BuytonDegree', columns: "*", condition: `DegreeNumber=${res.data[0].ItemDegreeExposure}` };
            //         const res3 = await postData("/read/readTopN", obj3);
            //         if (res3.data != undefined) {
            //             console.log(res.data[0].SomechBuyton + "           SomechBuyton");
            //             let obj4 = { tableName: 'tbl_BuytonSomech', columns: "*", condition: `SomechNumber=${res.data[0].SomechBuyton}` };
            //             const res4 = await postData("/read/readTopN", obj4);
            //             if (res4.data != undefined) {
            //                 console.log(res.data[0].ItemType + "           ItemType");
            //                 let obj4 = { tableName: 'tbl_BuytonGrain', columns: "*", condition: `GrainNumber=${res.data[0].ItemType}` };
            //                 const res4 = await postData("/read/readTopN", obj4);
            //                 console.log(res4.data);
            //                 console.log("i m tovi");

            //             }
            //         }
            //     }