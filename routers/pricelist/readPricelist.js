const express = require('express')
const router = express.Router()
const { logToFile } = require('../../services/logger/logTxt')
const { reqLogger } = require('../../services/logger/logger')

const { getPriceListById, getAllPriceList, getCustomersAndAreasForPriceList, getPriceListTypesById
    , getPriceListByAdditionsForDistance, getPriceListByAdditionsForCities, getPriceListByAdditionsForTime,
    getPriceListByAdditionsForTruckFill, getSupplierByNameProduct, getSupplierByNameProductBuyton,
    getPriceListProducts,
    getNoPricelistProducts } = require('../../modules/pricelist/readPricelist')
const { getProductsTypeNameForPricelist } = require('../../modules/pricelist/pricelist-products')
const { getProductsListByType } = require('../../modules/products/allProducts')


router.use(reqLogger())
router.get('/findAllPriceList', async (req, res) => {
    let objectLog = {
        name: 'findAllPriceList',
        description: 'findAllPriceList in router',
    }
    try {
        logToFile(objectLog)
        const result = await getAllPriceList();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }


})

router.get('/producttypes', (req, res) => {
    const query = req.query
    const pricelistTypes = Object.keys(query).filter(key => query[key] === 'true')
    const types = getProductsTypeNameForPricelist(pricelistTypes)
    res.status(200).send(types)
})

router.get('/producttypes/:id', async (req, res) => {
    const { id } = req.params
    const types = await getPriceListTypesById(id)
    res.status(200).send(types)
})



// חיפוש מחירון לפי ID
router.get('/pricelist/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await getPriceListById(id);
        res.status(result.status).send(result.data);
    }
    catch (error) {
        res.status(500).send(error);
    }


})

router.get('/pricelistproducts/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { type } = req.query
        const result = await getPriceListProducts({ id, type })
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error)
    }
})

router.get('/nopricelistproducts/:id/:type', async (req, res) => {
    try {
        const { id, type } = req.params
        const result = await getNoPricelistProducts({ id, type })
        res.status(200).send(result);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error)
    }
})


// פונקצית חיפוש מחירון לפי תאריך הוספה
// router.get('/FindPriceListByAddedDate/date', async (req, res) => {
//     try {
//         const result = await getPriceListByAddedDate(req.params.date);
//             res.status(200).send(result);
//     } 
//     catch (error) {
//         res.status(500).send(error);
//     }


// })
// פונקציית חיפוש על פי מוצר
router.get('/findPriceListProducts/:product', async (req, res) => {
    try {
        const result = await getPriceListbyProduct(req.params.product);
        res.status(200).send(result);
    }
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error);
    }
})

// חיפוש הצעת מחיר עפ מספר מחירון  לפי ספק 
router.get('/getCustomersAreasForPriceList/:priceListId', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByIdSupplierOrClientCode',
        description: 'FindPriceListByIdSupplierOrClientCode in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getCustomersAndAreasForPriceList(req.params.priceListId)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
//חיפוש מוצר על פי מספר  מחירון
router.get('/findPriceListByProduct/:id', async (req, res) => {
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
router.get('/findPriceListByAdditionsForDistance/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForDistance',
        description: 'FindPriceListByAdditionsForDistance in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByAdditionsForDistance(req.params.id)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
// חיפוש מחירון לפי תוספת לפי עיר
router.get('/findPriceListByAdditionsForCities/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForCities',
        description: 'FindPriceListByAdditionsForCities in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByAdditionsForCities(req.params.id)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
// חיפוש מחירון לפי תוספת יום או שעה
router.get('/findPriceListByAdditionsForTime/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForTime',
        description: 'FindPriceListByAdditionsForTime in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByAdditionsForTime(req.params.id)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)
    }
})
//  חיפוש מחירון לפי תוספת משאית
router.get('/findPriceListByAdditionsForTruckFill/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForTruckFill',
        description: 'FindPriceListByAdditionsForTruckFill in router',
    }
    try {
        logToFile(objectLog)

        const ans = await getPriceListByAdditionsForTruckFill(req.params.id)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})

// חיפוש ספק ואזור לפי מוצר
router.get('/findSupplierByNameProduct/:nameTable/:nameProduct', async (req, res) => {
    objectLog = {
        name: 'FindSupplierByNameProduct',
        description: 'FindSupplierByNameProduct in router',
    }
    try {
        const ans = await getSupplierByNameProduct(req.params.nameTable, req.params.nameProduct)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})

router.get('/findSupplierByNameProductBuyton/:nameTable/:nameProduct', async (req, res) => {
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
