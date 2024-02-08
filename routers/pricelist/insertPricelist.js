const express = require('express')
const router = express.Router()
const { logToFile } = require('../../services/logger/logTxt')
const { insert, getProducts, getId, getIdForBuytonDescribe, updateField, getNumber, addCustomerAndArea } = require('../../modules/pricelist/insertPricelist')
let object
//tbl_PriceList  


router.post('/create', express.json(), async (req, res) => {
    let object = {
        name: 'create',
        description: 'addPriceList in router',
        dataThatRecived: req.body,
    }
    logToFile(object)
    try {
        const result = await insert(req.body)
        if (result.status === 201) {
            res.status(201).send(result.data);
        }
        else {
            res.status(result.status).send(result.data);
        }
    }
    catch (error) {
        object.error = error.message
        logToFile(object)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error);
    }
})
//tbl_CitiesAdditions
router.post('/addCitiesAdditions', express.json(), async (req, res) => {
    try {
        objForLog = {
            name: 'CitiesAdditions',
            description: 'add cities additions in router',
            dataThatRecived: req.body,
        }
        logToFile(objForLog)
        const result = await insert(req.body, 'CitiesAdditions')
        if (result.status === 201)
            res.status(201).send(result.data);
        else
            res.status(result.status).send(result.data);
    }
    catch (error) {
        objForLog.error = error.message;
        logToFile(objForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)
    }
})

//tbl_TimeAdditions
router.post('/addTimeAdditions', async (req, res) => {
    let objForLog;
    try {
        objForLog = {
            name: 'TimeAdditions',
            description: 'addTimeAdditions in router',
            dataThatRecived: req.body,
        }
        logToFile(objForLog)
        const result = await insert(req.body, 'TimeAdditions')
        if (result.status === 201)
            res.status(201).send(result.data);
        else
            res.status(result.status).send(result.data);
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)
    }
})

//tbl_AdditionsForDistance
router.post('/addAdditionsForDistance', express.json(), async (req, res) => {
    let objForLog;
    try {
        objForLog = {
            name: 'AdditionsForDistance',
            description: 'addAdditionsForDistance in router',
            dataThatRecived: req.body,
        }
        logToFile(objForLog)
        const result = await insert(req.body, 'AdditionsForDistance')
        if (result.status === 201)
            res.status(201).send(result.data);
        else
            res.status(result.status).send(result.data);
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)
    }
})

//tbl_TruckFill
router.post('/addTruckFill', express.json(), async (req, res) => {
    let objForLog;
    try {
        objForLog = {
            name: 'TruckFill',
            description: 'addTruckFill in router',
            dataThatRecived: req.body,
        }
        logToFile(objForLog)
        const result = await insert(req.body, 'TruckFill')
        if (result.status === 201)
            res.status(201).send(result.data);
        else
            res.status(result.status).send(result.data);
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error)
    }

})

//tbl_PricesListBySupplierOrClient
router.post('/addCustomerAndArea', express.json(), async (req, res) => {
    let objForLog;
    try {
        objForLog = {
            name: 'addCustomerAndArea',
            description: 'addCustomerAndArea in router',
            dataThatRecived: req.body,
        }
        logToFile(objForLog)
        const result = await addCustomerAndArea(req.body)
        if (result.status === 201)
            res.status(201).send(result.data);
        else
            res.status(result.status).send(result.data);
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)
    }
})
//tbl_PricelistForProducts
router.post('/addProducts', express.json(), async (req, res) => {
    let objForLog;
    try {
        objForLog = {
            name: 'PricelistForProducts',
            description: 'addPricelistForProducts in router',
            dataThatRecived: req.body,
        }
        logToFile(objForLog)
        const result = await insert(req.body, 'PricelistForProducts')
        if (result.status === 201)
            res.status(201).send(result.data);
        else
            res.status(result.status).send(result.data);
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)
    }
})
//tbl_FinishProducts
router.post('/addPricelistForFinishProducts', express.json(), async (req, res) => {
    let objForLog;
    try {
        objForLog = {
            name: 'FinishProducts',
            description: 'addPricelistForFinishProducts in router',
            dataThatRecived: req.body,
        }
        logToFile(objForLog)
        const result = await insert(req.body, 'FinishProducts')
        if (result.status === 201)
            res.status(201).send(result.data);
        else
            res.status(result.status).send(result.data);
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)
    }
})
//tbl_Additions
router.post('/addAdditionsForPricelist', express.json(), async (req, res) => {
    let objForLog;
    try {
        objForLog = {
            name: 'Additions',
            description: 'addAdditionsForPricelist in router',
            dataThatRecived: req.body,
        }
        logToFile(objForLog)
        const result = await insert(req.body, 'Additions')
        if (result.status === 201)
            res.status(201).send(result.data);
        else
            res.status(result.status).send(result.data);
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)
    }
})

router.post('/getIdForPricelistName/:name', async (req, res) => {
    let objForLog;
    try {
        let objForLog = {
            name: 'getIdForPricelistName',
            description: 'getIdForPricelistName in router',
            pricelistName: req.params.name,
        }
        logToFile(objForLog)
        const result = await getId(req.params.name, 'pricelist')
        let obj = { id: result.data[0].Id }
        if (result.status === 200) {
            res.status(200).send(obj);
        }
        else
            res.status(500).send(obj);

    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        res.status(500).send(error.message)
    }

})

router.get('/detailsOfProfucts/:entityName', express.json(), async (req, res) => {
    let objForLog
    try {
        objForLog = {
            name: 'detailsOfProfucts',
            description: 'detailsOfProfucts in router expect to get a table name',
            dataThatRecived: req.params.entityName
        }
        logToFile(objForLog)
        const result = await getProducts(req.params.entityName)
        if (result.status === 201)
            res.status(201).send(result.data)
        else
            res.status(result.status).send(result.data)

    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        res.status(500).send(error.message)
    }
})

router.post('/updateFieldInTable/:id/:entityName', express.json(), async (req, res) => {
    let objForLog
    try {
        objForLog = {
            name: 'updateFieldInTable',
            description: 'updateFieldInTable in router, expect to get an id and a table name',
            id: req.params.id,
            entityName: req.params.entityName,
            data: req.body
        }
        logToFile(objForLog)
        const result = await updateField(req.params.id, req.params.entityName, req.body)
        if (result.status === 204)
            res.status(204).send({ message: true })
        else
            res.status(result.status).send(false)
    }
    catch (error) {
        logToFile(objForLog)
        if (error instanceof Array) {
            objForLog.error = error
            res.status(500).send(error)
        }
        else {
            objForLog.error = error.message
            res.status(500).send(error.message);
        }

    }
})

router.post('/getIdForBuytonDescribe/:name/:entityName', async (req, res) => {
    let objForLog
    try {
        objForLog = {
            name: 'getIdForBuytonDescribe',
            description: 'getIdForBuytonDescribe in router',
            describe: req.params.name,
            entityName: req.params.entityName
        }
        logToFile(objForLog)
        let response = await getIdForBuytonDescribe(req.params.name, req.params.entityName)
        let result = await getNumber(response, req.params.entityName)
        let obj = { id: result }
        if (response.status == 201) {
            res.status(201).send(obj)
        }
        else
            res.status(response.status).send(obj)
    }
    catch (error) {
        objForLog.error = error.message
        logToFile(objForLog)
        res.status(500).send(error.message)
    }
})
module.exports = router;
