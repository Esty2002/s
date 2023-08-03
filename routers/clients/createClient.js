const express = require('express')
const router = express.Router()
const { logToFile } = require('../../services/logger/logTxt')
const { addOneClient } = require('../../modules/clients/createClient')
const { checkObjectValidations } = require('../../services/validations/use-validations')
const { ErrorTypes } = require('../../utils/types')
router.post('/add', express.json(), async (req, res) => {
    let object = {
        name: 'add',
        description: 'add in router',
        dataThatRecived: req.body
    }
    try {
        let ans = await checkObjectValidations(req.body, 'Clients')
        if (ans) {
            const response = await addOneClient(req.body)
            if (response.status == 201)
                res.status(201).send(response.data)
            else {
                res.status(response.status).send('')
            }
        }

    } catch (error) {
        if (error.type === ErrorTypes.VALIDATION) {
            res.status(422).send(error)
        }
        else {
            res.status(500).send(error.message)
        }
    }
})
module.exports = router
