const express = require('express')
const router = express.Router()
const { findFinishProduct, insertFinishProduct, updateFinishProduct , deleteFinishProduct} = require('../../modules/products/finishProducts')
const { logToFile } = require('../../services/logger/logTxt')


router.post('/create', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'create',
        description: 'insert finished product in router',
        dataThatRecived: req.body
    }
    logToFile(objectForLog)
    try {
        const response = await insertFinishProduct(req.body)
        if (response.status === 201) 
            res.status(201).send(response.data)
     
        else{
            res.status(response.status).send(response.data)
        }
    }
    catch (error) {
        objectForLog.error = error.message
        logToFile(objectForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error)

    }
})

router.post('/update', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'update',
        description: 'update finished product in router',
        update: req.body.update,
        where: req.body.where
    }
    logToFile(objectForLog)
    try {
        const response = await updateFinishProduct({ data: req.body.update, condition: req.body.where }, 'FinishProducts')
        if (response.status === 204)
            res.status(204).send(true)
        else
            res.status(response.status).send(response)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/delete', express.json(), async (req, res) => {
    try {
        // const response = await deleteFinishProduct({ data: { Enabled: 0, DeleteDate: new Date() }, condition: req.body })
        const response = await deleteFinishProduct({ condition: req.body })
       res.status(response.status).send(response.data)
    }
    catch (error) { res.status(500).send(error.message) }
})

router.get('/find',  async (req, res) => {
    let objectForLog = {
        name: 'find',
        description: 'find finished product in router',
        condition: req.query.condition
    }
    logToFile(objectForLog)
    try {
        const response = await findFinishProduct(req.query)
        console.log(response.data, 'response.data');
        if (response.status == 200)
            res.status(200).send(response.data)
        else
            res.status(response.status).send(response)
    }
    catch (error) {
        console.log({error})
        objectForLog.error = error.message
        logToFile(objectForLog)
        if (error instanceof Array)
            res.status(500).send(error)
        else
            res.status(500).send(error.message)

    }
})

module.exports = router