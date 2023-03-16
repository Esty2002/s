const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient, updateSupplierOrClient, updateArea } = require('../modules/areas')
router.get('/', async (req, res) => {
    const result = await insertArea({ name: 'aaa', age: 12, disable: true })
    res.send(result)
})

router.get('/isExist', async (req, res) => {
    console.log("into isExist");
    console.log(req.query);
    const { phone } = req.query
    console.log(phone);
    const result = await findSupplierOrClient(phone)
    res.status(200).send(result)
})

router.post('/insertArea', express.json(), async (req, res) => {
    console.log("into insert Area");
    const result = await insertArea(req.body)
})

router.post('/deleteAreaDetail', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון,שם אזור} ב
    let {phone} = req.body.phone
    let nameArea = req.body.areaName
    const result = await updateArea(phone, nameArea)
})

router.post('/deleteArea', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון} ב
    const result = await updateSupplierOrClient(req.body)
})


module.exports = router