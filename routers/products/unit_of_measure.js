const express = require('express')
const router = express.Router()

const { findMeasureName, findMeasureNumber, insertMeasure, updateMeasure, getAll } = require('../../modules/products/measure')

router.get('/findMeasureName/:id', async (req, res) => {
    try {
        const response = await findMeasureName(req.params.id)
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
        const response = await findMeasureNumber(req.query.name)
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
    console.log("--------------------------------------------------------------");
    try {
        const response = await insertMeasure(req.body.new)

        console.log({ response: response })
        if (response)
            res.status(201).send(response.data)
        else {
            res.status(response.status).send(-1)
        }
    } 
    //מוסיף את השורה החדשה ומציג, אבל מחדיר סטטוס 500 בלי ליפול 
    catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        const response = await updateMeasure(req.body.prev, req.body.new)
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
        const response = await getAll()
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