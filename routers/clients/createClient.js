const express = require('express')
const router = express.Router()
const { logToFile } = require('../../services/logger/logTxt')
const { addOneClient } = require('../../modules/clients/createClient')
router.post('/add', express.json(), async (req, res) => {
    let object = {
        name: 'add',
        description: 'add in router',
        dataThatRecived: req.body
    }
    try {
        logToFile(object)
        const response = await addOneClient(req.body, 'Clients')
        console.log(response.status,' response.status');
        if (response.status === 201) {
            res.status(201).send(response.data)
        }
        else {
            res.status(response.status).send(response.data)
        }
    }
    catch (error) {
        object.error = error.message
        logToFile(object)
        res.status(500).send(error.message)
    }
})
module.exports = router
