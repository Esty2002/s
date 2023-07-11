const express = require('express')
const { insertAddition, updateAddition, findAddition } = require('../../modules/products/additions')
const router = express.Router()

router.post('/create', express.json(), async (req, res) => {
    try {
        const response = await insertAddition(req.body)
        ;
        if (response)
            res.status(201).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/delete', express.json(), async (req, res) => {
    try {
        const response = await updateAddition({ data: { Enabled: 0, DeleteDate: new Date() }, condition: req.body })
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

router.post('/find', express.json(), async (req, res) => {
    try {
        const response = await findAddition(req.body.arr, req.body.where)
        if (response || response === false)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
