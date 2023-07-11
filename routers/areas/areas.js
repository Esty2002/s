const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient, findArea,
    deleteSupplierOrClient, deleteArea, updateArea, findAllCities,
    getTheDataOfTheArea, updateLocation, updatePointAndRadius, findAll, findByDistinct } = require('../../modules/areas/areas')



router.get('/', async (req, res) => {
    res.send("areas---")
})

router.post('/insertArea', express.json(), async (req, res) => {
    try {
        const result = await insertArea(req.body)
        if (result) {
            console.log("result in router insertArea",result);
            res.status(201).send(result)
        }
        else
            res.status(500).send()
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.get('/findAllTypes/:collection/:filter', async (req, res) => {
    let collection = req.params.collection;
    let filter = req.params.filter
    try {
        const result = await findByDistinct(collection, filter)
        res.status(200).send(result.data.response)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.post('/deleteArea', express.json(), async (req, res) => {
    try {
        const areaName = req.body.name
        console.log('aaaaaaaaa', areaName);
        const response = await deleteArea(areaName)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})

router.post('/updateArea', express.json(), async (req, res) => {
    try {
        const response = await updateArea(req.body)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})






// למה צריך את זה - זה כמו הבא אחריו
// router.get('/findAllAreas/:code', async (req, res) => {
//     try {
//         const result = await findAreaByCode(req.params.code)
//         res.status(200).send(result)
//     } catch (error) { 
//         res.status(404).send(error)
//     }

// })





module.exports = router