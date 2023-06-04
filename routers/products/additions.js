const express = require('express')
const { insertAddition, updateAddition, findAddition } = require('../../modules/products/additions')
const router = express.Router()

router.post('/create', express.json(), async (req, res) => {
    try {
        res.status(200).send(await insertAddition(req.body))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/delete', express.json(), async (req, res) => {
    try {
        res.status(200).send(await updateAddition({ enabled: false, deletedDate: new Date().toISOString() }, req.body))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        res.status(200).send(await updateAddition(req.body.update, req.body.where))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/find', express.json(), async (req, res) => {
    try {
        res.status(200).send(await findAddition(req.body.arr, req.body.where))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router
