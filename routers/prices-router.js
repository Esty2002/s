const router = require('express').Router()
const express = require('express')

const { addPriceList, createTable, updatePriceList, dletePriceList } = require('../../modules/sql/prices')

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

module.exports = router