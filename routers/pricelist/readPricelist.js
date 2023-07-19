const express = require('express')
const router = express.Router()
const { logToFile } = require('../../services/logger/logTxt')

const { getAllPriceList, getPriceListByIdSupplierOrClientCode, getPriceListByIdPriceListId
    , getPriceListByAdditionsForDistance, getPriceListByAdditionsForCities, getPriceListByAdditionsForTime, getPriceListByAdditionsForTruckFill, getSupplierByNameProduct, getSupplierByNameProductBuyton } = require('../../modules/pricelist/readPricelist')

router.get('/findAllPriceList', async (req, res) => {
    objectLog = {
        name: 'findAllPriceList',
        description: 'findAllPriceList in router',
    }
    try {
        logToFile(objectLog)
        const result = await getAllPriceList();
        res.status(200).send(result);
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error);
    }
})

// // // חיפוש הצעת מחיר עפ מספר מחירון  לפי ספק 
router.get('/FindPriceListByIdSupplierOrClientCode/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByIdSupplierOrClientCode',
        description: 'FindPriceListByIdSupplierOrClientCode in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByIdSupplierOrClientCode(req.params.id)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
//חיפוש מוצר על פי מספר  מחירון
router.get('/FindPriceListByProduct/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByProduct',
        description: 'FindPriceListByProduct in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByIdPriceListId(req.params.id)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
//  חיפוש מחירון לפי תוספת לפי מרחק
router.get('/FindPriceListByAdditionsForDistance/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForDistance',
        description: 'FindPriceListByAdditionsForDistance in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByAdditionsForDistance(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
// חיפוש מחירון לפי תוספת לפי עיר
router.get('/FindPriceListByAdditionsForCities/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForCities',
        description: 'FindPriceListByAdditionsForCities in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByAdditionsForCities(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
// חיפוש מחירון לפי תוספת יום או שעה
router.get('/FindPriceListByAdditionsForTime/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForTime',
        description: 'FindPriceListByAdditionsForTime in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByAdditionsForTime(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
//  חיפוש מחירון לפי תוספת משאית
router.get('/FindPriceListByAdditionsForTruckFill/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForTruckFill',
        description: 'FindPriceListByAdditionsForTruckFill in router',
    }
    try {
        logToFile(objectLog)

        const ans = await getPriceListByAdditionsForTruckFill(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})

// חיפוש ספק ואזור לפי מוצר
router.get('/FindSupplierByNameProduct/:nameTable/:nameProduct', async (req, res) => {
    objectLog = {
        name: 'FindSupplierByNameProduct',
        description: 'FindSupplierByNameProduct in router',
    }
    try {
        logToFile(objectLog)

        const ans = await getSupplierByNameProduct(req.params.nameTable, req.params.nameProduct)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})

router.get('/FindSupplierByNameProductBuyton/:nameTable/:nameProduct', async (req, res) => {
    objectLog = {
        name: 'FindSupplierByNameProductBuyton',
        description: 'FindSupplierByNameProductBuyton in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getSupplierByNameProductBuyton(req.params.nameTable, req.params.nameProduct)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})

module.exports = router;