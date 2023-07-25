const { getData, postData } = require('../../services/axios')
// const { checkObjectValidations, checkObjectForUpdate } = require("../../services/validations/use-validations")
// const { objectsForValidations } = require('../../services/validations/validations-objects')

async function addPriceList(values, entityName) {
    console.log(values);
    // if (insertvalidation(entityName, data)) {
        try {
            const result = await postData( '/create',
                {
                    entityName: entityName,
                    values: values
                })
            return result
        }
        catch (error) {
            throw new Error('you cant insert this object');
        }
    // }
    // else {
    //     throw new Error("the datails is not match to the schem")
    // }

}


async function deletePriceList(entityName, PriceListId, ProductId) {
    let con;
    if (entityName == "PriceList" || entityName == "PricesListBySupplierOrClient") {
        con = `Id='${parseInt(PriceListId)}'`;
    }
    else {
        con = `PriceListId='${parseInt(PriceListId)}' and ProductId='${ProductId}'`
    }
    try {
        const result = await postData( '/update',
            {
                entityName: entityName,
                values: { Disabled: false },
                condition: con
            })
        return result;
    }
    catch (error) {
        throw new Error('the object cant delete / delete already')
    }

}

async function findPriceList(entityName, PriceListId, ProductId) {
    let con;
    if (entityName == "tbl_PriceList" || entityName == "tbl_PricesListBySupplierOrClient") {
        con = `Id='${parseInt(PriceListId)}'`;
    }
    else {
        con = `PriceListId='${parseInt(PriceListId)}' and ProductId='${ProductId}'`
    }
    try {
        const result = await postData( '/readTopN',
            {
                entityName: entityName,
                columns: '*',
                condition: con
            })
        return result;
    }
    catch (error) {

    }
}


async function insertvalidation(entityName, data) {
    // const obj = {
    //     "tbl_PriceList": checkObjectValidations(data, objectsForValidations.PriceList),
    //     "tbl_Prices": checkObjectValidations(data, objectsForValidations.Prices),
    //     "tbl_CitiesAdditions": checkObjectValidations(data, objectsForValidations.CitiesAdditions),
    //     "tbl_TimeAdditions": checkObjectValidations(data, objectsForValidations.TimeAdditions),
    //     "tbl_DistanceAdditions": checkObjectValidations(data, objectsForValidations.DistanceAdditions),
    //     "tbl_TruckFill": checkObjectValidations(data, objectsForValidations.TruckFill),
    //     "tbl_PricesListBySupplierOrClient": checkObjectValidations(data, objectsForValidations.PricesListBySupplierOrClient),
    // }
    // let ans = obj[entityName];
    // return ans
}


module.exports = {
    addPriceList,
    findPriceList,
    deletePriceList
}