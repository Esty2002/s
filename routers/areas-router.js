const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient, deleteSupplierOrClient, deleteArea, updateArea, findAreaOfSupplierOrClient, findAreaByCode } = require('../modules/areas')



router.get('/', (req, res) => {
    res.send('into router...')
})

//o.k
router.get('/isExist/:code', async (req, res) => {
    console.log('isExist');
    const phone = req.params.code
    try {
        const result = await findSupplierOrClient(phone)
        console.log('result', result);
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})


//  ביני-לעבור
router.get('/findAreaOfSupplierOrClient', async (req, res) => {
    try {
        const result = await findAreaOfSupplierOrClient(req.query.code, req.query.areaName)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }
})


router.get('/findAllAreas/:code', async (req, res) => {
    try {
        const result = await findAreaByCode(req.params.code, { "areasList.areaName": 1, _id: 0 })
        console.log("result", result);
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})

router.get('/findAreasByCode/:code', async (req, res) => {

    console.log("in router");
    let code = req.params.code
    try {
        const result = await findAreaByCode(code)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})

// o.k
router.post('/insertArea', express.json(), async (req, res) => {
    // מקבל את כל האובייקט שצריך להכניס למונגו
    try {

        const result = await insertArea(req.body)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }
})


router.post('/deleteAreaDetail', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון,שם אזור} ב
    let { phone } = req.body.phone
    let nameArea = req.body.areaName
    try {
        const result = await deleteArea(phone, nameArea)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }

})

router.post('/updateArea', express.json(), async (req, res) => {
    try {
        const result = await updateArea(req.body)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }

})

router.post('/deleteArea', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון} ב
    try {
        const result = await deleteSupplierOrClient(req.body)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})




module.exports = router