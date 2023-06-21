const express = require('express')
const router = express.Router()

const { findMeasureName, findMeasureNumber, insertMeasure, updateMeasure, getAll } = require('../../modules/products/measure')

router.get('/findMeasureName', async (req, res) => {
    try {
        const response =await findMeasureName(req.query.id)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/findMeasureId', async (req, res) => {
    try {
        const response =await findMeasureNumber(req.query.name)
        if (response)
            res.status(200).send(`${response}`)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/create', express.json(), async (req, res) => {
    try {
        const response =await insertMeasure(req.body.new)
        console.log({response:response})
        if (response.data)
            res.status(201).send(response.data)
        else {
            res.status(500).send(-1)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        const response =await updateMeasure(req.body.prev, req.body.new)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/all', async (req, res) => {
    try {
        const response =await getAll()
        console.log(response);
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router