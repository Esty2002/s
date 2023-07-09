const express = require('express')
const router = express.Router()

const {findMeasureNumber, findMeasureName, insertMeasure, updateMeasure, getAll, deleteItem} = require('../../modules/products/measure')
router.get('/findMeasureName/:id', async (req, res) => {
    try {
        const response = await findMeasureName(req.params.id)
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/findMeasureId', async (req, res) => {
    try {
        const response = await findMeasureNumber(req.query.name)
        if (response.status ===200)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/create', express.json(), async (req, res) => {
    try {
        const response = await insertMeasure(req.body.new)
        if (response.status === 201)
            res.status(201).send(response.data)
        else {
            res.status(response.status).send(-1)
        }
    } 
    catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        const response = await updateMeasure(req.body.prev, req.body.new)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/all', async (req, res) => {
    try {
        const response = await getAll()
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
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