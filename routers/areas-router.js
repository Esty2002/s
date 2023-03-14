const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient } = require('../modules/areas')
router.get('/', async (req, res) => {
    const result = await insertArea({'phone':req.body})
    res.send(result)
})

router.get('/isExist', async (req, res) => {
    const { phone } = req.body
    const result = await findSupplierOrClient(phone)
    res.status(200).send(result)
})


router.get('/findByCode',async(req,res)=>{
    const result =await findAreaByCode(req.body)
    res.status(200).send(result)
})

module.exports = router