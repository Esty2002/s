const router = require('express').Router()
const express = require('express')

const {addPriceList, updatePriceList, deletePriceList, selectAreaAndPriceByItemCode, selectProductByAreaName, selectAreaByClientOrSupplyCode, selectAllAreasByPriceListCodeAndAreaNameAndItemCode, selectProductsOfSupplierOrClientByAreaName } = require('../modules/prices')


router.get('/', async (req, res) => {
    await createTable()
    res.send('priceList')
})


// --------------------------------------------------------------
router.get('/findPriceListByPriceListCodeAndAreaNameAndItemCode/:code/:area/:productCode', async (req, res) => {
    try {
        const ans = await selectAllAreasByPriceListCodeAndAreaNameAndItemCode(req.params)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)
    }

})

router.get('/findProductsOfSupplierOrClientByAreaName/:code/:areaName', async (req, res) => {
    try {
        const ans = await selectProductsOfSupplierOrClientByAreaName(req.params)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)
    }

})



// הפונקציה מקבלת קוד פריט ומחזירה את האזורים שבו הוא משווק ואת מחירו בכל אזור
router.get('/findAreaAndPriceByItemCode/:code', async (req, res) => {
    try {
        const ans = await selectAreaAndPriceByItemCode(req.params)
        res.status(200).send(ans)

    } catch (error) {
        res.status(404).send(error)

    }

})

// הפונקציה מקבלת שם אזור ומחזירה את המוצרים המשווקים שם ואת מחירם
router.get('/findProductAndPricesByAreaName/:area', async (req, res) => {
    try {
        const ans = await selectProductByAreaName(req.params, true)
        res.status(200).send(ans)

    } catch (error) {
        res.status(404).send(error)

    }

})

// הפונקציה מקבלת שם אזור ומחזירה את המוצרים המשווקים שם
router.get('/findProductByAreaName/:area', async (req, res) => {
    try {
        const ans = selectProductByAreaName(req.params, false)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }

})

// הפונקציה מקבלת קוד ספק/לקוח ומחזירה את האזורים שרשומים אצלו
router.get('/findAreaByClientOrSupplyCode/:code', async (req, res) => {
    try {
        const ans = await selectAreaByClientOrSupplyCode(req.params)
        console.log('ans-----',ans);
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error)

    }

})
//  הוספת מחירון -מקבל אוביקט של הנתוהים ומכניס ל__ ומחזיר כמה שורות הושפעו בתוך מערך
router.post('/addPriceList', express.json(), async (req, res) => {
    try {
        const result = await addPriceList(req.body)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})
//  עדכון תאריך של מחירון מקבל את התאריך החדש ואת ה יד ומחזיר כמה שורות עודכנו בתוך מערך
router.post('/updatePriceList', express.json(), async (req, res) => {
    try {
        const result = await updatePriceList(req.body)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})
// מחיקרת מחירון-מצפה לקבל אוביקט שמכיל את ה "יד" ומחזיר כמה שורות הושפעו בתוך מערך                   
router.post('/deletePriceList', express.json(), async (req, res) => {
    try {
        const result = await deletePriceList(req.body.id)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})


//  הפונקציה מקבלת:קוד ספק/לקוח,שם אזור וקוד פריט ומחזירה את האוביקט של המחירון שתואם לנתונים
// router.get('/findAllAreasByPriceListCodeAndAreaNameAndItemCode/:code/:area/:productCode', async (req, res) => {
//     try {
//         const ans = selectAllAreasByPriceListCodeAndAreaNameAndItemCode(req.params)
//         res.status(200).send(ans)
//     } catch (error) {
//         res.status(404).send(error)

//     }

// })

// מי שצריכה את הפונקציה הזאת שתשתמש בפונקציה הם עושות אותו דבר בדיוק  findPriceListByPriceListCodeAndAreaNameAndItemCode



module.exports = router