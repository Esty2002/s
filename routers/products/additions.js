const express = require('express')
const { insertAddition, updateAddition, findAddition, deleteAddition } = require('../../modules/products/additions')
const { logToFile } = require('../../services/logger/logTxt')
const { ErrorTypes } = require('../../utils/types')
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
            res.status(201).send(response.data)
        else {
            res.status(response.status).send(response.data)
        }
    }
    catch (error) {
        objectForLog.error = error
        logToFile(objectForLog)
        if (error.type && error.type === ErrorTypes.VALIDATION)
            res.status(422).send(error)
        else
            res.status(500).send(error)

    }
})

router.post('/delete', express.json(), async (req, res) => {
    try {

        const response = await deleteAddition({ condition: req.body })

        res.status(response.status).send(response.data)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/update', express.json(), async (req, res) => {
    try {
        const { data, condition } = req.body
        const response = await updateAddition({ data, condition })
        if (response) {
            res.status(204).end()
        }
        if (response === false) {
            res.status(304).end()
        }
    }
    catch (error) {
        if (error.type && error.type === ErrorTypes.VALIDATION)
            res.status(422).send(error)
        else
            res.status(500).send(error)
    }
})

router.get('/find', async (req, res) => {
    let objectForLog = {
        name: 'find',
        description: 'find Addition in router',
        condition: req.query
    }
    logToFile(objectForLog)
    try {
        const response = await findAddition(req.query)
        if (response.status == 200)
            res.status(200).send(response.data)
        else
            res.status(response.status).send(response)
    } catch (error) {
        console.log({error});
        objectForLog.error = error.message
        logToFile(objectForLog)
        if (error.type && error.type === ErrorTypes.VALIDATION)
            res.status(422).send(error)
        else
            res.status(500).send(error.message)
    }
})

module.exports = router
