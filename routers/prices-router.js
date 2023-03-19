const router = require('express').Router()
const express = require('express')

const { addPriceList,
    createTable,
    updatePriceList,
    dletePriceList,
    selectAllAreasByPriceListCodeAndAreaNameAndItemCode,
    selectAreaByClientOrSupplyCode,
    selectProductsOfSupplierOrClientByAreaName } = require('../modules/prices')

router.get('/', (req, res) => {
    res.send('priceList')
})

router.get('/findPriceListByPriceListCodeAndAreaNameAndItemCode/:code/:area/:productCode', async (req, res) => {
    console.log(req.params.code, req.params.area, req.params.productCode);
    const ans = await selectAllAreasByPriceListCodeAndAreaNameAndItemCode(req.params.code, req.params.area, req.params.productCode)
    res.send(ans)
})

router.get('/findProductsOfSupplierOrClientByAreaName/:code/:areaName', async (req, res) => {
    console.log('find');
    const ans = await selectProductsOfSupplierOrClientByAreaName(req.params.code, req.params.areaName)
    res.send(ans)
})

router.get('/findAreaByClientOrSupplyCode/:code', async (req, res) => {
    const code = req.params.code
    console.log('code',code);
    const ans = await selectAreaByClientOrSupplyCode(code)
    console.log('ans-',ans);
    res.status(200).send(ans)

})
router.post('/addPriceList', express.json(), async (req, res) => {
    //צריך לקבל פה אוביקט של כל פרטי ההוספה 
    const result = await addPriceList(req.body)
    res.send(result)
})
router.post('/updatePriceList', express.json(), async (req, res) => {
    // id - מצפה לקבל אוביקט של תאריך שבו הרשומה תקפה וכן את ה 
    const result = await updatePriceList(req.body)
    res.send(result)
})

router.post('/deletePriceList', express.json(), async (req, res) => {
    // id - מצפה לקבל אוביקט שמכיל את ה 
    console.log(req.body.id);
    const result = await dletePriceList(req.body.id)
    res.send(result)
})

module.exports = router