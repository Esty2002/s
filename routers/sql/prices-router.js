const router = require('express').Router()
const express = require('express')

const { addPriceList,
    createTable,
    updatePriceList,
    dletePriceList,
    selectAllAreasByPriceListCodeAndAreaNameAndItemCode,
    selectAreaByClientOrSupplyCode,
    selectProductsOfSupplierOrClientByAreaName } = require('../../modules/sql/prices')

router.get('/', (req, res) => {
    res.send('priceList')
})

router.get('/findPriceListByPriceListCodeAndAreaNameAndItemCode/:code/:area/:productCode', async (req, res) => {
    const ans = await selectAllAreasByPriceListCodeAndAreaNameAndItemCode(req.params.code, req.params.area, req.params.productCode)
    res.send(ans)
})

router.get('/findProductsOfSupplierOrClientByAreaName/:code/:areaName', async (req, res) => {
    const ans = await selectProductsOfSupplierOrClientByAreaName(req.params.code, req.params.areaName)
    res.send(ans)
})

router.get('/findAreaByClientOrSupplyCode/:code', async (req, res) => {
    // const code = 100
    const code = req.params.code
    const ans = await selectAreaByClientOrSupplyCode(code)
    res.status(200).send(ans)

})
router.post('/addPriceList', express.json(), async (req, res) => {
    //צריך לקבל פה אוביקט של כל פרטי ההוספה 
    const result = await addPriceList(req.body)
    res.send(result)
})
router.post('/updatePriceList', express.json(), async (req, res) => {
    // id - מצפה לקבל אוביקט של תאריך שבו הרשומה תקפה וכן את ה 
    const result = await updatePriceList(req.body.date, req.body.id)
    res.send(result)
})

router.post('/deletePriceList', express.json(), async (req, res) => {
    // id - מצפה לקבל אוביקט שמכיל את ה 
    const result = await dletePriceList(req.body.id)
    res.send(result)
})

module.exports = router