const express = require('express')
const router = express.Router()

const { insert, getProducts, getId, getIdForBuytonDescribe, updateField } = require('../../modules/pricelist/insertPricelist')
let tableName
//tbl_PriceList




router.post('/addPriceList', express.json(), async (req, res) => {
    try {
        const result = await insert(req.body, 'tbl_PriceList')
        res.status(result.status).send(result.data);
    }
    catch (error) {
        res.status(500).send(error.message)
    }

})
//tbl_CitiesAdditions
router.post('/addCitiesAdditions', express.json(), async (req, res) => {
    tableName = 'tbl_CitiesAdditions'
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

//tbl_TimeAdditions
router.post('/addTimeAdditions', express.json(), async (req, res) => {
    tableName = 'tbl_TimeAdditions'
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

//tbl_AdditionsForDistance
router.post('/addAdditionsForDistance', express.json(), async (req, res) => {
    tableName = 'tbl_AdditionsForDistance'
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

//tbl_TruckFill
router.post('/addTruckFill', express.json(), async (req, res) => {
    tableName = 'tbl_TruckFill'
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

//tbl_PricesListBySupplierOrClient
router.post('/addPricesListBySupplierOrClient', express.json(), async (req, res) => {
    tableName = 'tbl_PricesListBySupplierOrClient'
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})


//tbl_PricelistForProducts
router.post('/addPricelistForProducts', express.json(), async (req, res) => {
    tableName = 'tbl_PricelistForProducts'
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})
//tbl_FinishProducts
router.post('/addPricelistForFinishProducts', express.json(), async (req, res) => {
    tableName = 'tbl_FinishProducts'
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})
//tbl_Additions
router.post('/addAdditionsForPricelist', express.json(), async (req, res) => {
    tableName = 'tbl_Additions'
    _ = await insert(req.body, tableName)
    res.status(200).send(true)
})

router.get('/getIdForPricelistName/:name/:tbname', async (req, res) => {
    const result = await getId(req.params.name, req.params.tbname)
    console.log({ result });
    let obj={id:result}
    res.send(obj);
})

router.post('/detailsOfProfucts/:tbname', express.json(), async (req, res) => {
    let tbName = req.params.tbname
    const result = await getProducts(tbName)
    console.log(result, 'kkkkk');
    res.status(200).send(result)
})

router.post('/updateFieldInTable/:id/:tbName', express.json(), async (req, res) => {
    const result = await updateField(req.params.id, req.params.tbName, req.body)
    res.status(200).send(result)
})

router.get('/getIdForProductName/:name/:tbName', async (req, res) => {
    console.log(req.params.name, '  djshfjdhsfjhjsdhfkjsdhf', req.params.tbName);
    const result = await getId(req.params.name, req.params.tbName)
    console.log(result, ' rrrrrrrrrrrrrrrrrr');
    // console.log(result.data[0].Id, ' kkkk');
    // let id=result.data[0].Id
    res.status(200).send(result.data[0])
})

router.get('/getIdForBuytonDescribe/:name/:tbName', async (req, res) => {
    let result = await getIdForBuytonDescribe(req.params.name, req.params.tbName)
    console.log(result, ' jjjj');
    result = result[0]
    let t = req.params.tbName.substring(10) + 'Number'
    let re = `${result[t]}`
    res.status(200).send(re)
})


module.exports = router;
