const express = require('express')
const router = express.Router()
const { findPump,insertPump,updatePump } = require('../modules/pumps')

router.post('/insert', express.json(), async (req, res) => {
    try {
        const ans = await insertPump(req.body)
        res.status(200).send(ans)

    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/find', async (req, res) => {
    try {
        const ans = await findPump(req.query.arr, req.query.where)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/update', express.json(), async (req, res) => {
    try {
        const ans = await updatePump(req.body.update, req.body.where)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/delete', express.json(), async (req, res) => {
    try {
        const ans = await updatePump({ enabled: false, deletedDate: new Date() }, req.body)
        res.status(200).send(ans)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router