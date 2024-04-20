require('dotenv').config();
const { postData, getData, putData, deleteData } = require('../../services/axios');
const { logToFile } = require('../../services/logger/logTxt');
const { basicProductsModels, buildBasicCementCombinations, addPropertiesToCementCombinations, getBasicCementItemName } = require('../products/basicProducts');
const { modelNames, models, getModelKey } = require('../utils/schemas');
//פונקציית חיפוש שמביאה את כל ההצעות מחיר
async function getAllPriceList() {
    objectLog = {
        name: 'getAllPriceList',
        description: 'getAllPriceList in module',
    }
    try {
        logToFile(objectLog)
        let obj = { condition: { disabled: 0 } };
        const res = await postData(`/read/readMany/${modelNames.PRICELIST}`, obj);


        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get all pricelist');
    }
}


// פונקציית חיפוש על פי מוצר
async function getPriceListForProduct(object) {
    let objectLog = {
        name: 'getPriceListbyProduct',
        description: 'getPriceListbyProduct in module- in try',
    }
    try {
        logToFile(objectLog)
        let obj = { condition: { id: object.id, disabled: false } };
        const res = await postData(`/read/readMany/${modelNames.PRODUCTS_PRICE_LIST}`, obj);
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
    let objectLog
    try {
        objectLog = {
            name: 'getPriceListbySupplierCodeOrClientCode',
            description: 'getPriceListbySupplierCodeOrClientCode in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "PriceListId", condition: { SupplierOrClient: object } }
        const res = await postData(`/read/readMany/${PRICESLISTBYSUPPLIERORCLIENT}`, obj);
        arrTempPriceListId = []
        if (res.data != undefined) {
            res.data.forEach(element => {
                arrTempPriceListId.push(element.PriceListId)
            });
            let obj2 = { condition: { IN: [{ Id: arrTempPriceListId }] } };

            const res2 = await postData(`/read/readMany/${modelNames.PRICELIST}`, obj2);
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

async function getCustomersAndAreasForPriceList(object) {
    let objectLog
    try {
        objectLog = {
            name: 'getCustomersAndAreasForPriceList',
            description: 'getCustomersAndAreasForPriceList in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${modelNames.PRICELIST_FOR_BUYTON_CUSTOMERS}`, obj);
        return res.data;
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getCustomersAndAreasForPriceList');
    }
}

async function getPriceListById(id) {
    let objectLog
    try {
        objectLog = {
            name: 'getPriceListByIdPriceListId',
            description: 'getPriceListByIdPriceListId in module- in try',
        }
        logToFile(objectLog)

        let obj = { condition: { entityName: modelNames.PRICELIST, property: getModelKey(modelNames.PRICELIST), value: id } };
        const res = await postData(`/read/readOneDetails/${modelNames.PRICELIST}`, obj);
        if (res.data.productsPricelist) {
            const basicCementItems = res.data.productsPricelist.filter(({ entity }) => basicProductsModels.includes(entity))
            if (basicCementItems.length > 0) {
                let basicCementCombinations = buildBasicCementCombinations(basicCementItems.map(({ product }) => product))
                basicCementCombinations = basicCementCombinations.map(item => item.map(({ model, ...rest }) => ({ ...rest, entity: model.entity })))
                basicCementCombinations = basicCementCombinations.map(item => ({
                    combination: item, name: item.reduce((name, it) => [...name, getBasicCementItemName(it)], []).join(' '), entity:'basicProducts'
                }))
                basicCementCombinations = addPropertiesToCementCombinations({
                    originList: basicCementItems,
                    combinationList: basicCementCombinations,
                    props: [models.PRODUCTS_PRICE_LIST.fields.PRICE.name, models.PRODUCTS_PRICE_LIST.fields.DISCOUNT.name]
                })
                res.data.basicCementCombinations = basicCementCombinations
            }

        }
        return res;
    }
    catch (error) {
        console.log({ error })
        objectLog.error = error.message
        logToFile(objectLog)
        throw new Error('can not get getPriceListByIdPriceListId');
    }
}

// פונקציה שמחזירה תוספת לפי מרחק
async function getPriceListByAdditionsForDistance(object) {
    let objectLog
    try {
        objectLog = {
            name: 'getPriceListByAdditionsForDistance',
            description: 'getPriceListByAdditionsForDistance in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${ADDITIONSFORDISTANCE}`, obj);
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
    let objectLog
    try {
        objectLog = {
            name: 'getPriceListByAdditionsForCities',
            description: 'getPriceListByAdditionsForCities in module- in try',
        }
        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${CITIESADDITIONS}`, obj);
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
    let objectLog
    try {
        objectLog = {
            name: 'getPriceListByAdditionsForTime',
            description: 'getPriceListByAdditionsForTime in module- in try',
        }
        logToFile(objectLog)
        let obj = { entityName: TIMEADDITIONS, columns: "*", condition: { PriceListId: object } };

        const res = await postData(`/read/readMany/${TIMEADDITIONS}`, obj);
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
    let objectLog = {
        name: 'getPriceListByAdditionsForTruckFill',
        description: 'getPriceListByAdditionsForTruckFill in module- in try',
        arguments: JSON.stringify(object)
    }
    try {

        logToFile(objectLog)
        let obj = { columns: "*", condition: { PriceListId: object } };
        const res = await postData(`/read/readMany/${TRUCKFILL}`, obj);
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

    let objectLog = {
        name: 'getSupplierByNameProduct',
        description: 'getSupplierByNameProduct in module- in try',
    }
    logToFile(objectLog)
    try {
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


    let objectLog = {
        name: 'getSupplierByNameProductBuyton',
        description: 'getSupplierByNameProductBuyton in module- in try',
    }
    logToFile(objectLog)
    try {
        let temp = { columns: "*", condition: { ItemDescribe: nameProduct } };
        const resTemp = await postData(`/read/count/${BUYTONITEMS}`, obj);
        let obj = { columns: "*", condition: { ItemDescribe: nameProduct }, topn: { resTemp } };
        const res = await postData(`/read/readMany/${BUYTONITEMS}`, obj);
        if (res.data != undefined) {

            let temp2 = { columns: "PriceListId", condition: { 1: 1 } };
            // /count/:entityName

            const count = await postData(`/read/count/${PRICElISTFORPRODUCTS}`, temp2);
            let obj2 = { columns: "PriceListId", condition: { AND: [{ entityName: 'tbl_BuytonStrength' }, { ProductId: res.data[0].ItemStrength }] }, topn: { count } };
            // /count/:entityName

            const res2 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj2);
            let obj3 = { columns: "PriceListId", condition: { AND: [{ entityName: 'tbl_BuytonDegree' }, { ProductId: res.data[0].ItemDegreeExposure }] }, topn: { count } };
            const res3 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj3);
            let obj4 = { columns: "PriceListId", condition: { AND: [{ entityName: 'tbl_BuytonSomech' }, { ProductId: res.data[0].BuytonSomech }] }, topn: { count } };
            const res4 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj4);
            let obj5 = { columns: "PriceListId", condition: { AND: [{ entityName: 'tbl_BuytonGrain' }, { ProductId: res.data[0].ItemType }] }, topn: { count } };
            const res5 = await postData(`/read/readMany/${PRICElISTFORPRODUCTS}`, obj5);
            temp = checkValid(res2.data, res3.data)
            temp2 = checkValid(temp, res4.data)
            temp3 = checkValid(temp2, res5.data)
            arrTemp2 = []
            if (temp3 !== undefined) {
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
    getPriceListById,
    getPriceListByAdditionsForDistance,
    getPriceListByAdditionsForCities,
    getPriceListByAdditionsForTime,
    getPriceListByAdditionsForTruckFill,
    getSupplierByNameProduct,
    getSupplierByNameProductBuyton,
    getCustomersAndAreasForPriceList,
    getAllPriceList,
    getPriceListbySupplierCodeOrClientCode,
    getPriceListForProduct
};















