const express = require('express')
const router = express.Router()
const { logToFile } = require('../../services/logger/logTxt')
const { addOneClient } = require('../../modules/clients/createClient')
const { checkObjectValidations } = require('../../services/validations/use-validations')
router.post('/add', express.json(), async (req, res) => {
    let object = {
        name: 'add',
        description: 'add in router',
        dataThatRecived: req.body
    }
    try {
        logToFile(object)
        const response = await addOneClient(req.body, 'Clients')
        if (response.status === 201) {
            res.status(201).send(response.data)
        }
        else {
            res.status(response.statusCode).send(response.data)
        }
    }
    catch (error) {
        object.error = error.message
        logToFile(object)
        res.status(500).send(error.message)
    }
})
module.exports = router
