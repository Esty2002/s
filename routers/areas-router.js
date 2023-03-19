const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient, deleteSupplierOrClient, deleteArea,updateArea, findAreaOfSupplierOrClient } = require('../modules/areas')

router.get('/', (req, res) => {
    res.send('hhhhhhhhh')
})


router.get('/isExist/:code', async (req, res) => {
    console.log('isExist');
    const phone = parseInt(req.params.code)
    const result = await findSupplierOrClient(phone)
    console.log('result', result);
    res.status(200).send(result)
})
router.get('/findAreaOfSupplierOrClient', async (req, res) => {
    const result = await findAreaOfSupplierOrClient(req.query.code, req.query.areaName)
    res.send(result)
})

router.post('/insertArea', express.json(), async (req, res) => {
    // מקבל את כל האובייקט שצריך להכניס למונגו
    // let p = { suplierOrClientCode: '1234', areas: { areaName: 'dsd', point: { x: 20, y: 50 }, radius: '0' } }
    // let g={suplierOrClientCode: '1234', areas: { areaName: 'fdssd', pointsList: [Array] }}

    const result = await insertArea(req.body)
    res.send(result)
})

router.post('/delateArea', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון,שם אזור} ב
    let { phone } = req.body.phone
    let nameArea = req.body.areaName
    const result = await deleteArea(phone, nameArea)
})

router.post('/updateArea', express.json(), async (req, res) => {
    const result = await updateArea(req.body)
    res.send(result)
})

router.post('/delateSupplierOrClient', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון} ב
    const result = await deleteSupplierOrClient(req.body)
})


module.exports = router