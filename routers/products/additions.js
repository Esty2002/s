const express = require('express')
const { insertAddition, updateAddition, findAddition } = require('../../modules/products/additions')
const { logToFile } = require('../../services/logger/logTxt')
const router = express.Router()

router.post('/create', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'create',
        description: 'insert addition in router',
        dataThatRecived: req.body
    }
    logToFile(objectForLog)
    try {
        const response = await insertAddition(req.body)
        if (response.status == 201)
            res.status(201).send(true)
        else {
            res.status(response.status).send(response)
        }
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

router.post('/delete', express.json(), async (req, res) => {
    try {
        const response = await updateAddition({ data: { Disabled: 1, DisableUser: new Date() }, condition: req.body })
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        const response = await updateAddition({ data: req.body.update, condition: req.body.where })
        if (response) {
            res.status(200).send(response)
        }
        else {
            res.status(500).send(response)
        }
    }
    catch (error) { res.status(404).send(error.message) }
})

router.get('/find',  async (req, res) => {
    let objectForLog = {
        name: 'find',
        description: 'find Addition in router',
        condition: req.body.where
    }
    logToFile(objectForLog)
    try {
        const response = await findAddition(req.query)
        if (response.status == 200)
            res.status(200).send(response.data)
        else
            res.status(response.status).send(response)
    } catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)
    }
})

module.exports = router
