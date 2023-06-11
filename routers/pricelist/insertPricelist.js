const express = require('express')
const router = express.Router()

const { addOnePriceList,insert} = require('../../modules/pricelist/insertPricelist')
let tableName
//tbl_PriceList
router.post('/addPriceList', express.json(), async (req, res) => {
    _ = await addOnePriceList(req.body)
    res.status(200).send(true)
})



//to do one function in module and all the functions in the router 
// call for here


//tbl_CitiesAdditions
router.post('/addCitiesAdditions', express.json(), async (req, res) => {
    console.log("innnn: ", req.body);
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

module.exports = router;
