const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient, findArea,
    deleteSupplierOrClient, deleteArea, updateArea, findAllCities,
    getTheDataOfTheArea, updateLocation, updatePointAndRadius, findAll, findByDistinct,findInPolygon } = require('../../modules/areas/areas')



router.get('/', async (req, res) => {
    res.send("areas---")
})

router.post('/insertArea', express.json(), async (req, res) => {
    try {
        const result = await insertArea(req.body)

        res.status(result.status).send(result.data)

    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/findInPolygon' ,express.json(), async (req, res) => {
   console.log({findInPolygon:req.body})
    try {
        const result = await findInPolygon(req.body)
        // console.log('***********************', result.data);
        res.status(200).send(result.data)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.get('/findAllTypes/:collection/:filter', async (req, res) => {
    let collection = req.params.collection;
    let filter = req.params.filter
    try {
        const result = await findByDistinct(collection, filter)
        // console.log('***********************', result.data);
        console.log({result})
        res.status(200).send(result.data)
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
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
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
});

module.exports = router