const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient ,findAreaByCode,updateSupplierOrClient, updateArea } = require('../modules/areas')
router.get('/', async (req, res) => {
    const result = await insertArea({ name: 'aaa', age: 12, disable: true })
    res.send(result)
})


// *
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

router.post('/delateArea', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון,שם אזור} ב
    let {phone} = req.body.phone
    let nameArea = req.body.areaName
    const result = await updateArea(phone, nameArea)
})

router.post('/delateSupplierOrClient', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון} ב
    const result = await updateSupplierOrClient(req.body)
})



router.get('/findAreasByCode/:code',async(req,res)=>{

    console.log("in router");
    // const code=1235
    let code=req.params.code
    code=parseInt(code)
    const result =await findAreaByCode(code)
    res.send(result)
})

module.exports = router