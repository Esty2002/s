const express = require('express')
const router = express.Router()

const { insert,getProducts} = require('../../modules/pricelist/insertPricelist')
let tableName
//tbl_PriceList
router.post('/addPriceList', express.json(), async (req, res) => {
    _ = await insert(req.body,'tbl_PriceList2')
    res.status(200).send(true)
})

//tbl_CitiesAdditions
router.post('/addCitiesAdditions', express.json(), async (req, res) => {
    tableName='tbl_CitiesAdditions'
    _ = await insert(req.body,tableName)
    res.status(200).send(true)
})

//tbl_TimeAdditions
router.post('/addTimeAdditions', express.json(), async (req, res) => {
    tableName='tbl_TimeAdditions'
    _ = await insert(req.body,tableName)
    res.status(200).send(true)
})

//tbl_AdditionsForDistance
router.post('/addAdditionsForDistance', express.json(), async (req, res) => {
    tableName='tbl_AdditionsForDistance'
    _ = await insert(req.body,tableName)
    res.status(200).send(true)
})

//tbl_TruckFill
router.post('/addTruckFill', express.json(), async (req, res) => {
    tableName='tbl_TruckFill'
    _ = await insert(req.body,tableName)
    res.status(200).send(true)
})

//tbl_PricesListBySupplierOrClient
router.post('/addPricesListBySupplierOrClient', express.json(), async (req, res) => {
    tableName='tbl_PricesListBySupplierOrClient'
    _ = await insert(req.body,tableName)
    res.status(200).send(true)
})


//tbl_PricelistForProducts
router.post('/addPricelistForProducts', express.json(), async (req, res) => {
    tableName='tbl_PricelistForProducts'
    _ = await insert(req.body,tableName)
    res.status(200).send(true)
})

router.post('/detailsOfProfucts/:tbname',express.json(),async(req,res)=>{
    let tbName=req.params.tbname
    console.log(tbName,' lklkl');
    const result=await getProducts(tbName)
    res.status(200).send(result)
})

module.exports = router;
