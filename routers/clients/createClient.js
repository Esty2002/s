const express = require('express')
const router = express.Router()
const { addOneClient } = require('../../modules/clients/createClient')

router.post('/add', express.json(), async (req, res) => {
    try {
        const response =await addOneClient(req.body)
        if (response)
            res.status(201).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})


module.exports = router



