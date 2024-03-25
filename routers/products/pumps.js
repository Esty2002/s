const express = require('express')
const router = express.Router()
const { findPump, insertPump, updatePump, findPumpName, deletePump } = require('../../modules/products/pumps')
const { logToFile } = require('../../services/logger/logTxt')
const { ErrorTypes } = require('../../utils/types')


// router.get('/pumpNameById/:id', async (req, res) => {
//     try {
//         const response = await findPumpName(req.params.id)
//         if (response.status === 200) {
//             res.status(200).send(response.data)
//         }
//         else {
//             res.status(response.status).send(response.data)
//         }
//     }
//     catch (error) {
//         res.status(500).send(error.message)
//     }
// })

router.post('/create', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'create',
        description: 'insert pump in router',
        dataThatRecived: req.body
    }
    logToFile(objectForLog)
    try {
        console.log("im in pump");
        const response = await insertPump(req.body)
        console.log("respoon", response);
        if (response.status === 201)
            res.status(201).send(response.data)
        else
            res.status(response.status).send(response.data)
    }
    catch (error) {
        objectForLog.error = error
        logToFile(objectForLog)
        if (error.type === ErrorTypes.VALIDATION) {
            res.status(422).send(error)
        }
        else
            res.status(500).send(error)
    }
})

router.get('/find', async (req, res) => {
    let objectForLog = {
        name: 'find',
        description: 'find pumps in router',
        condition: req.query
    }
    logToFile(objectForLog)
    try {
        console.log({ query: req.query })
        const response = await findPump(req.query)
        if (response.status == 200)
            res.status(200).send(response.data)
        else
            res.status(response.status).send(response)
    }
    catch (error) {
        objectForLog.error = error
        logToFile(objectForLog)
        if (error.type === ErrorTypes.VALIDATION) {
            res.status(422).send(error)
        }
        else
            res.status(500).send(error)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        const { data, condition } = req.body
        const response = await updatePump({ data, condition })
        if (response)
            res.status(204).send(response)
        else if (response === false) {
            res.statusCode(304).end()
        }
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        if (error.type && error.type === ErrorTypes.VALIDATION)
            res.status(422).send(error)
        else
            res.status(500).send(error)
    }
})

router.post('/delete', express.json(), async (req, res) => {

    try {
        const response = await deletePump({ condition: req.body })
        res.status(response.status).send(response.data)
    }
    catch (error) { res.status(500).send(error.message) }
})

module.exports = router