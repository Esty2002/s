const router = require('express').Router()
const express = require('express')

const { addPriceList, createTable, updatePriceList, dletePriceList } = require('../../modules/sql/prices')

router.get('/', (req, res) => {
    res.send('priceList')
})

router.post('/addPriceList', express.json(), async (req, res) => {
    //צריך לקבל פה אוביקט של כל פרטי ההוספה 
    const result = await addPriceList(req.body)
    res.send(result)
})
router.post('/updatePriceList', express.json(), async (req, res) => {
    const result = await updatePriceList(req.body.date, req.body.id)
    res.send(result)
})

router.post('/deletePriceList', express.json(), async (req, res) => {
    const result = await dletePriceList(req.body.id)
    res.send(result)
})

module.exports = router