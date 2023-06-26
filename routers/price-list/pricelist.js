const router = require('express').Router()
const express = require('express')


const { addPriceList, findPriceList, deletePriceList } = require('../../modules/price-list/pricelist')

router.get('/', (req, res) => {
    res.send('in router prices-new')
})

router.post('/insert', express.json(), async (req, res) => {
    console.log("in post ", req.body);
    try {
        const result = await addPriceList(req.body.data, req.body.tableName)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }
})


router.post('/find', express.json(), async (req, res) => {
    try {
        const result = await findPriceList(req.body.data, req.body.tableName)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }
})

router.post('/delete', express.json(), async (req, res) => {
    try {
        const result = await deletePriceList(req.body.data, req.body.tableName)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }
})



module.exports = router