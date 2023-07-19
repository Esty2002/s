require('dotenv').config();
const { SQL_DB_PRICELIST, PRICESLISTBYSUPPLIERORCLIENT, PRICElISTFORPRODUCTS, ADDITIONSFORDISTANCE, CITIESADDITIONS, TIMEADDITIONS, TRUCKFILL, PUMPS, BUYTONITEMS } = process.env;
const { postData } = require('../../services/axios');
const { logToFile } = require('../../services/logger/logTxt')
//פונקציית חיפוש שמביאה את כל ההצעות מחיר
async function getAllPriceList() {
    objectLog = {
        name: 'getAllPriceList',
        description: 'getAllPriceList in module',
    }
    try {
        logToFile(objectLog)
        let obj = { columns: "*", condition: { Disabled: 0 } };
        const res = await postData(`/read/readMany/${SQL_DB_PRICELIST}`, obj);


        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get all pricelist');
    }
}


// פונקציית חיפוש על פי מוצר
async function getPriceListByIdPriceListId(object) {
    try {
        objectLog = {
            name: 'getPriceListbyProduct',
            description: 'getPriceListbyProduct in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "*", condition: { AND: [{ Disabled: 0 }, { Id: object.id }] } };
        const res = await postData(`/read/readMany/${SQL_DB_PRICELIST}`, obj);
        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListbyProduct');
    }
}
// פונקציית חיפוש על פי קוד ספק או לקוח
async function getPriceListbySupplierCodeOrClientCode(object) {
    try {
        objectLog = {
            name: 'getPriceListbySupplierCodeOrClientCode',
            description: 'getPriceListbySupplierCodeOrClientCode in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "PriceListId", condition: { SupplierOrClient: object } }
        const res = await postData(`/read/readMany/${PRICESLISTBYSUPPLIERORCLIENT}`, obj);
        console.log(res.data);
        arrTempPriceListId = []
        if (res.data != undefined) {
            res.data.forEach(element => {
                arrTempPriceListId.push(element.PriceListId)
            });
            console.log(arrTempPriceListId);
            let obj2 = { columns: "*", condition: { IN: [{ Id: arrTempPriceListId }] } };

            const res2 = await postData(`/read/readMany/${SQL_DB_PRICELIST}`, obj2);
            console.log(res2.data);
            return res2.data;

        }
        else {
            throw new Error('can not found this city');
        }
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListbySupplierCodeOrClientCode');
    }
}

async function getPriceListByIdSupplierOrClientCode(object) {
    try {
        objectLog = {
            name: 'getPriceListByIdSupplierOrClientCode',
            description: 'getPriceListByIdSupplierOrClientCode in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${PRICESLISTBYSUPPLIERORCLIENT}`, obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListByIdSupplierOrClientCode');
    }
}
async function getPriceListByIdPriceListId(object) {
    console.log(object);
    try {
        objectLog = {
            name: 'getPriceListByIdPriceListId',
            description: 'getPriceListByIdPriceListId in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj);
        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListByIdPriceListId');
    }
}

// פונקציה שמחזירה תוספת לפי מרחק
async function getPriceListByAdditionsForDistance(object) {
    console.log(object);
    try {
        objectLog = {
            name: 'getPriceListByAdditionsForDistance',
            description: 'getPriceListByAdditionsForDistance in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${ADDITIONSFORDISTANCE}`, obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListByAdditionsForDistance');
    }
}
// פונקציה שמחזירה תוספת לפי עיר
async function getPriceListByAdditionsForCities(object) {
    console.log(object);
    try {
        objectLog = {
            name: 'getPriceListByAdditionsForCities',
            description: 'getPriceListByAdditionsForCities in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${CITIESADDITIONS}`, obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListByAdditionsForCities');
    }
}
// פונקציה שמחזירה תוספת לפי יום או שעה
async function getPriceListByAdditionsForTime(object) {
    console.log(object);
    try {
        objectLog = {
            name: 'getPriceListByAdditionsForTime',
            description: 'getPriceListByAdditionsForTime in module- in try',
        }
        logToFile(objectLog)
        let obj = { entityName: TIMEADDITIONS, columns: "*", condition: { PriceListId: object } };

        const res = await postData(`/read/readMany/${TIMEADDITIONS}`, obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListByAdditionsForTime');
    }
}
//  פונקציה שמחזירה תוספת לפי משאית 
async function getPriceListByAdditionsForTruckFill(object) {
    objectLog = {
        name: 'getPriceListByAdditionsForTruckFill',
        description: 'getPriceListByAdditionsForTruckFill in module- in try',
        arguments: JSON.stringify(object)
    }
    try {

        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${TRUCKFILL}`, obj);
        console.log(res.data);
        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListByAdditionsForTruckFill');
    }
}

// חיפוש בטבלת מוצרים וספקים לפי שם טבלה ותאור מוצר

async function getSupplierByNameProduct(nameTable, nameProduct) {
    console.log({ nameTable });
    console.log({ nameProduct });
    try {
        objectLog = {
            name: 'getSupplierByNameProduct',
            description: 'getSupplierByNameProduct in module- in try',
        }
        logToFile(objectLog)

        let obj = { columns: "Id", condition: { Name: nameProduct } };
        const res = await postData(`/read/readMany/${nameTable}`, obj);
        arrTemp = []
        if (res.data != undefined) {
            res.data.forEach(element => {
                arrTemp.push(element.Id)
            });
            let obj2 = { columns: "PriceListId", condition: { AND: [{ IN: [{ ProductId: arrTemp }] }, { TableName: nameTable }] } };
            const res2 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj2);
            arrTemp2 = []
            if (res2.data != undefined) {
                res2.data.forEach(element => {
                    arrTemp2.push(element.PriceListId)
                });



                let obj3 = { columns: "*", condition: { IN: [{ PriceListId: arrTemp2 }] } };
                const res3 = await postData(`/read/readMany/${PRICESLISTBYSUPPLIERORCLIENT}`, obj3);
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
        objectLog.error = error.message
        logToFile(objectLog)
        throw error;
    }
}
// חיפוש בטבלת מוצרים וספקים לפי טבלת מוצרי בטון ולפי שם המוצר
async function getSupplierByNameProductBuyton(nameTable, nameProduct) {
    console.log({ nameTable });
    console.log({ nameProduct });
    try {
        objectLog = {
            name: 'getSupplierByNameProductBuyton',
            description: 'getSupplierByNameProductBuyton in module- in try',
        }
        logToFile(objectLog)
        let obj = {  columns: "*", condition: { ItemDescribe: nameProduct } };
        const res = await postData(`/read/readMany/${BUYTONITEMS}`, obj);
        console.log(res.data, '                           res.data');
        if (res.data != undefined) {

            let obj2 = { columns: "PriceListId", conditioncondition: { AND: [{ TableName: 'tbl_BuytonStrength' }, { ProductId: res.data[0].ItemStrength }] } };
            const res2 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj2);
            let obj3 = { columns: "PriceListId", condition: { AND: [{ TableName: 'tbl_BuytonDegree' }, { ProductId: res.data[0].ItemDegreeExposure }] } };
            const res3 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj3);
            let obj4 = { columns: "PriceListId", condition: { AND: [{ TableName: 'tbl_BuytonSomech' }, { ProductId: res.data[0].BuytonSomech }] } };
            const res4 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj4);
            let obj5 = { columns: "PriceListId", condition: { AND: [{ TableName: 'tbl_BuytonGrain' }, { ProductId: res.data[0].ItemType }] } };
            const res5 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj5);;
            temp = checkValid(res2.data, res3.data)
            temp2 = checkValid(temp, res4.data)
            temp3 = checkValid(temp2, res5.data)
            arrTemp2 = []
            if (temp3 != undefined) {
                temp3.forEach(element => {
                    arrTemp2.push(element.PriceListId)
                });

                let obj3 = { columns: "*", condition: { IN: [{ PriceListId: arrTemp2 }] } };
                const res3 = await postData(`/read/readMany/${PRICESLISTBYSUPPLIERORCLIENT}`, obj3);
                return res3.data;
            }
        }
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw error;
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
}

module.exports = {
    getPriceListByAdditionsForDistance, getPriceListByAdditionsForCities, getPriceListByAdditionsForTime, getPriceListByAdditionsForTruckFill, getSupplierByNameProduct, getSupplierByNameProductBuyton,
    getPriceListByIdSupplierOrClientCode, getAllPriceList, getPriceListbySupplierCodeOrClientCode, getPriceListByIdPriceListId
};















