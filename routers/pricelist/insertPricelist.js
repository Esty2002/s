const express = require('express')
const router = express.Router()
const { logToFile } = require('../../services/logger/logTxt')
const { insert, getProducts, getId, getIdForBuytonDescribe, updateField } = require('../../modules/pricelist/insertPricelist')
let tableName
let object
//tbl_PriceList
router.post('/addPriceList', express.json(), async (req, res) => {
    try {
        object = {
            name: 'addPriceList',
            description: 'addPriceList in router- in try',
            dataThatRecived: req.body,
        }
        logToFile(object)
        const result = await insert(req.body, 'PriceList')
        res.status(result.status).send(result.data);
    }
    catch (error) {
        object.error=error.message
        logToFile(object)
        console.log({object});
        res.status(500).send(error.message)
    }
})
//tbl_CitiesAdditions
router.post('/addCitiesAdditions', express.json(), async (req, res) => {
    tableName = 'tbl_CitiesAdditions'
    let object = {
        name: 'create',
        description: 'addCitiesAdditions in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

//tbl_TimeAdditions
router.post('/addTimeAdditions', express.json(), async (req, res) => {
    tableName = 'tbl_TimeAdditions'
    let object = {
        name: 'create',
        description: 'addTimeAdditions in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

//tbl_AdditionsForDistance
router.post('/addAdditionsForDistance', express.json(), async (req, res) => {
    tableName = 'tbl_AdditionsForDistance'
    let object = {
        name: 'create',
        description: 'addAdditionsForDistance in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

//tbl_TruckFill
router.post('/addTruckFill', express.json(), async (req, res) => {
    tableName = 'tbl_TruckFill'
    let object = {
        name: 'create',
        description: 'addTruckFill in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

//tbl_PricesListBySupplierOrClient
router.post('/addPricesListBySupplierOrClient', express.json(), async (req, res) => {
    tableName = 'tbl_PricesListBySupplierOrClient'
    let object = {
        name: 'create',
        description: 'addPricesListBySupplierOrClient in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})
//tbl_PricelistForProducts
router.post('/addPricelistForProducts', express.json(), async (req, res) => {
    tableName = 'tbl_PricelistForProducts'
    let object = {
        name: 'create',
        description: 'addPricelistForProducts in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})
//tbl_FinishProducts
router.post('/addPricelistForFinishProducts', express.json(), async (req, res) => {
    tableName = 'tbl_FinishProducts'
    let object = {
        name: 'create',
        description: 'addPricelistForFinishProducts in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})
//tbl_Additions
router.post('/addAdditionsForPricelist', express.json(), async (req, res) => {
    tableName = 'tbl_Additions'
    let object = {
        name: 'create',
        description: 'addAdditionsForPricelist in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

router.get('/getIdForPricelistName/:name/:tbname', async (req, res) => {
    let params = { name: req.params.name, tbname: req.params.tbname }
    let object = {
        name: 'read',
        description: 'getIdForPricelistName in router',
        dataThatRecived: params
    }
    logToFile(object)
    const result = await getId(req.params.name, req.params.tbname)
    console.log({ result });
    let obj = { id: result }
    res.send(obj);
    //if i send a prameter that it isn't an object it fell on mistake, because res.send can send onli object
    //the mistake seem like this:
    // ErrorCaptureStackTrace(err);
    //  [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: 75
})

router.post('/detailsOfProfucts/:tbname', express.json(), async (req, res) => {
    // let params = { tbname: req.params.tbname }
    let tbName = req.params.tbname
    let object = {
        name: 'read',
        description: 'detailsOfProfucts in router expect to get table name',
        dataThatRecived: tbName,
    }
    logToFile(object)
    const result = await getProducts(tbName)
    res.status(200).send(result)
})

router.post('/updateFieldInTable/:id/:tbName', express.json(), async (req, res) => {
    let params = { name: req.params.id, tbname: req.params.tbName }

    let object = {
        name: 'update',
        description: 'updateFieldInTable in router expect to get id and table name',
        dataThatRecived: params,
        values: req.body
    }
    logToFile(object)
    const result = await updateField(req.params.id, req.params.tbName, req.body)
    res.status(200).send(result)
})

// router.get('/getIdForProductName/:name/:tbName', async (req, res) => {
//     let params = { name: req.params.name, tbname: req.params.tbname }
//     let object = {
//         name: 'read',
//         description: 'getIdForProductName in router',
//         dataThatRecived: params
//     }
//     logToFile(object)
//     const result = await getId(req.params.name, req.params.tbName)
//     // console.log(result.data[0].Id, ' kkkk');
//     // let id=result.data[0].Id
//     res.status(200).send(result.data[0])
// })

router.get('/getIdForBuytonDescribe/:name/:tbName', async (req, res) => {
    let params = { name: req.params.name, tbname: req.params.tbName }
    let object = {
        name: 'read',
        description: 'getIdForBuytonDescribe in router',
        dataThatRecived: params
    }
    logToFile(object)
    let result = await getIdForBuytonDescribe(req.params.name, req.params.tbName)
    result = result[0]
    let t = req.params.tbName.substring(10) + 'Number'
    let re = `${result[t]}`
    res.status(200).send(re)
})
module.exports = router;
