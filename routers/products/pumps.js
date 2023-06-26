const express = require('express')
const router = express.Router()
const { findPump, insertPump, updatePump, findPumpName } = require('../../modules/products/pumps')


router.get('/pumpNameById/:id', async (req, res) => {
    try {
        const response = await findPumpName(req.params.id)
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

router.post('/create', express.json(), async (req, res) => {
    try {
        const response = await insertPump(req.body)
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
        const response = await findPump(req.body.arr, req.body.where)
        if (response || response === false)
            res.status(200).send(response)
        else
            res.status(500).send(response)
    }
    catch (error) { res.status(500).send(error.message) }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        console.log(req.body.where);
        const response = await updatePump({ data: req.body.update, condition: req.body.where })
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
        const response = await updatePump({ data: { Enabled: 0, DeleteDate: new Date() }, condition: req.body })
        if (response)
            res.status(200).send(response)
        else
            res.status(500).send(response)
    }
    catch (error) { res.status(500).send(error.message) }
})

module.exports = router