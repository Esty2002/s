const express = require('express')
const router = express.Router()

const {findMeasureNumber, findMeasureName, insertMeasure, updateMeasure, getAll, deleteItem} = require('../../modules/products/measure')
const { logToFile } = require('../../services/logger/logTxt')

router.get('/findMeasureName/:id', async (req, res) => {
    try {
        const response = await findMeasureName(req.params.id)
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/findMeasureId', async (req, res) => {
    try {
        const response = await findMeasureNumber(req.query.name)
        if (response.status ===200)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/create', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'create',
        description: 'insert a unit of measure in router',
        dataThatRecived: req.body
    }
    logToFile(objectForLog)
    
    try {
        const response = await insertMeasure(req.body.new, 'UnitOfMeasure')
        if (response === true)
            res.status(201).send(response)
        else
            res.status(500).send(response)
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
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
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/deleteItem', express.json(), async (req, res) => {
    try {
        const response = await deleteItem(req.body)
        if (response.status === 200) {
            res.status(200).send(response.data)
        }
        else {
            res.status(response.status).send(response.data)
        }
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router