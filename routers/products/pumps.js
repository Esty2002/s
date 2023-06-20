const express = require('express')
const router = express.Router()
const { findPump, insertPump, updatePump } = require('../../modules/products/pumps')

router.post('/create', express.json(), async (req, res) => {
    try {
        const response =await insertPump(req.body)
        if (response)
            res.status(201).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/find', express.json(), async (req, res) => {
    try {
        const response =await findPump(req.body.arr, req.body.where)
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
        const response =await updatePump(req.body.update, req.body.where)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/delete', express.json(), async (req, res) => {
    try {
        const response =await updatePump({ enabled: false, deletedDate: new Date() }, req.body)
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