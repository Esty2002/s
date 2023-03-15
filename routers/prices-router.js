const router = require('express').Router()
const express = require('express')
const { selectAreaAndPriceByItemCode, selectProductAndPricesByAreaName, selectProductByAreaName, selectAreaByClientOrSupplyCode, selectAllAreasByPriceListCodeAndAreaNameAndItemCode } = require('../modules/prices')

router.get('/', async (req, res) => {
    // console.log("in router");
})

// הפונקציה מקבלת קוד פריט ומחזירה את האזורים שבו הוא משווק ואת מחירו בכל אזור
router.get('/findAreaAndPriceByItemCode/:code', async (req, res) => {
    const itemCode = req.params.code 
    const ans = await selectAreaAndPriceByItemCode(itemCode)
    res.send(ans)

})

// הפונקציה מקבלת שם אזור ומחזירה את המוצרים המשווקים שם ואת מחירם
router.get('/findProductAndPricesByAreaName/:area', async (req, res) => {
    const areaName = req.params.area  //  מקבלת שם אזור
    const ans = await selectProductAndPricesByAreaName(areaName)
    res.send(ans)

})

// הפונקציה מקבלת שם אזור ומחזירה את המוצרים המשווקים שם
router.get('/findProductByAreaName/:area', async (req, res) => {
    const areaName = req.params.area 
    const ans=selectProductByAreaName(areaName)
    res.send(ans)
})

// הפונקציה מקבלת קוד ספק/לקוח ומחזירה את האזורים שרשומים אצלו
router.get('/findAreaByClientOrSupplyCode/:code', async (req, res) => {
    const code=req.params.code 
    const ans=selectAreaByClientOrSupplyCode(code)
    res.send(ans)

})

//  הפונקציה מקבלת:קוד ספק/לקוח,שם אזור וקוד פריט ומחזירה את האוביקט של המחירון שתואם לנתונים
router.get('/findAllAreasByPriceListCodeAndAreaNameAndItemCode/:code/:area/:productCode', async (req, res) => {
    console.log("in router5");
    const ans=selectAllAreasByPriceListCodeAndAreaNameAndItemCode(req.params.code,req.params.area,req.params.productCode)
    res.send(ans)
})



module.exports = router