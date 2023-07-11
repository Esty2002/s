const express = require('express')
const router = express.Router()
const { findFinishProduct, insertFinishProduct, updateFinishProduct } = require('../../modules/products/finishProducts')
const { logToFile } = require('../../services/logger/logTxt')


router.post('/create', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'create',
        description: 'insert product in router',
        dataThatRecived: req.body
    }
    logToFile(objectForLog)
    try {
        console.log(req.body)
        const response = await insertFinishProduct(req.body,'FinishProducts')
        console.log({response});
        if (response===true)
            res.status(201).send(response)
        else 
            res.status(500).send(response)
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        res.status(500).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    console.log('router', req.body);
    try {
        const response = await updateFinishProduct({ data: req.body.update, condition: req.body.where })
        if (response) {
            res.status(200).send(response)
        }
        else {
            res.status(500).send(response)
        }
    }
    catch (error) { res.status(404).send(error.message) }
})

router.post('/delete', express.json(), async (req, res) => {
    try {
        const response = await updateFinishProduct({ data: { Enabled: 0, DeleteDate: new Date() }, condition: req.body })
        if (response)
            res.status(200).send(response)
        else
            res.status(500).send(response)
    }
    catch (error) { res.status(500).send(error.message) }
})

router.post('/find', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'find',
        description: 'find product in router',
        dataThatRecived: req.body
    }
    logToFile(objectForLog)
    try {
        const response = await findFinishProduct(req.body.arr, req.body.where,'FinishProducts')
        if (response)
            res.status(200).send(response)
        else
            res.status(500).send(response)
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        res.status(500).send(error.message)
    }
})

module.exports = router