const router = require('express').Router()
const express = require('express')
const { selectAreaAndPriceByItemCode, selectProductAndPricesByAreaName, selectProductByAreaName, selectAreaByClientOrSupplyCode, selectAllAreasByPriceListCodeAndAreaNameAndItemCode } = require('../modules/prices')

router.get('/', async (req, res) => {
    console.log("in router");
})

// הצגת שם אזור ומחיר של קוד פריט מסוים
router.get('/findAreaAndPriceByItemCode/:code', async (req, res) => {
    const itemCode = req.params.code  // מקבלת קוד פריט  
    const ans = await selectAreaAndPriceByItemCode(itemCode)
    res.send(ans)

})

// הצגת קוד פריט ומחיר של אזור מסוים
router.get('/findProductAndPricesByAreaName/:area', async (req, res) => {
    const areaName = req.params.area  //  מקבלת שם אזור
    const ans = await selectProductAndPricesByAreaName(areaName)
    res.send(ans)

})

// הצגת קוד פריט של אזור מסוים
router.get('/findProductByAreaName/:area', async (req, res) => {
    const areaName = req.params.area // מקבלת שם אזור
    const ans=selectProductByAreaName(areaName)
    res.send(ans)
})

router.get('/findAreaByClientOrSupplyCode/:code', async (req, res) => {
    const code=req.params.code
    const ans=selectAreaByClientOrSupplyCode(code)
    res.send(ans)

})

router.get('/findAllAreasByPriceListCodeAndAreaNameAndItemCode/:code/:area/:productCode', async (req, res) => {
    console.log("in router5");
    const ans=selectAllAreasByPriceListCodeAndAreaNameAndItemCode(req.params.code,req.params.area,req.params.productCode)
    res.send(ans)
})



module.exports = router