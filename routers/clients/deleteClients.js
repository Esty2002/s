const express = require('express');
const router = express.Router();

const { deletedClientByCode } = require('../../modules/clients/deleteClient')

router.post('/deleteClient', express.json(), async (req, res) => {
    console.log(req.body.ClientCode, "req.body.ClientCode, req.body.user, req.body.DeletionDate");
    try {
        const response =await deletedClientByCode(req.body.ClientCode, req.body.user, req.body.DeletionDate)
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
