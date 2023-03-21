const router = require('express').Router()
const express = require('express')

const {  addPriceList, updatePriceList, dletePriceList,selectAreaAndPriceByItemCode, selectProductAndPricesByAreaName, selectProductByAreaName, selectAreaByClientOrSupplyCode, selectAllAreasByPriceListCodeAndAreaNameAndItemCode,selectProductsOfSupplierOrClientByAreaName } = require('../modules/prices')


router.get('/', (req, res) => {
    res.send('priceList')
})

//  הוספת מחירון -מקבל אוביקט של הנתוהים ומכניס ל__ ומחזיר כמה שורות הושפעו בתוך מערך
router.post('/addPriceList', express.json(), async (req, res) => {
    const result = await addPriceList(req.body)
    res.send(result)
})
//  עדכון תאריך של מחירון מקבל את התאריך החדש ואת ה יד ומחזיר כמה שורות עודכנו בתוך מערך
router.post('/updatePriceList', express.json(), async (req, res) => {
    const result = await updatePriceList(req.body)
    res.send(result)
})
// מחיקרת מחירון-מצפה לקבל אוביקט שמכיל את ה "יד" ומחזיר כמה שורות הושפעו בתוך מערך                   
router.post('/deletePriceList', express.json(), async (req, res) => {
    const result = await dletePriceList(req.body.id)
    res.send(result)
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
    const ans=await selectAreaByClientOrSupplyCode(code)
    console.log(ans);
    res.send(ans)

})

//  הפונקציה מקבלת:קוד ספק/לקוח,שם אזור וקוד פריט ומחזירה את האוביקט של המחירון שתואם לנתונים
router.get('/findAllAreasByPriceListCodeAndAreaNameAndItemCode/:code/:area/:productCode', async (req, res) => {
    console.log("in router5");
    const ans=selectAllAreasByPriceListCodeAndAreaNameAndItemCode(req.params.code,req.params.area,req.params.productCode)
    res.send(ans)
})



module.exports = router