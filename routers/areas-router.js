const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient } = require('../modules/areas')
router.get('/', async (req, res) => {
    const result = await insertArea({ name: 'aaa', age: 12 })
    res.send(result)
})

router.get('/isExist', async (req, res) => {
    console.log("into isExist");
    console.log(req.query);
    const { phone } = req.query
    const result = await findSupplierOrClient(phone)
    res.status(200).send(result)
})

router.post('/insertArea', express.json(), async (req, res) => {
    console.log("into insert Area");
    const result = await insertArea(req.body)

    // res.send(result)
})


module.exports = router