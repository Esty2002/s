const express = require('express')
const router = express.Router()

const { findMeasureNumber, findMeasureName, insertMeasure, updateMeasure, getAll, deleteItem } = require('../../modules/products/measure')
const { ErrorTypes } = require('../../utils/types');
const { logToFile } = require('../../services/logger/logTxt')

router.get('/findMeasureName/:id', async (req, res) => {
    let objectForLog = {
        name: 'findMeasureName:id',
        description: 'findMeasureName:id in router',
    }
    logToFile(objectForLog)
    try {
        const response = await findMeasureName(req.params.id)
        if (response.status == 200)
            res.status(200).send(JSON.stringify(response.data[0].measure))
        else
            res.status(response.status).send(response)
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        res.status(500).send(error.message)
    }
})

router.get('/findMeasureId', async (req, res) => {
    let objectForLog = {
        name: 'findMeasureId',
        description: 'findMeasureId in router',
    }
    logToFile(objectForLog)
    try {
        const response = await findMeasureNumber(req.query.name)
        if (response.status == 200)
            res.status(200).send(JSON.stringify(response.data[0].id))
        else
            res.status(response.status).send(response)
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
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
        const response = await insertMeasure(req.body)
        if (response.status === 201)
            res.status(201).send(true)
        else
            res.status(response.status).send(response)
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        if (error.type === ErrorTypes.VALIDATION) {
            res.status(422).send(error)
        }
        else
            res.status(500).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        console.log(req.body);
        const response = await updateMeasure({ obj: req.body })
        console.log({response});
        if (response)
            res.status(204).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/all', async (req, res) => {
    let objectForLog = {
        name: 'all',
        description: 'all units of measure in router',
    }
    logToFile(objectForLog)
    try {
        const response = await getAll()
        if (response.status == 200)
            res.status(200).send(response.data)
        else
            res.status(response.status).send(response)
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
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