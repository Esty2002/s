const express = require('express');
const router = express.Router();

const { deletedClientByCode } = require('../../modules/clients/deleteClient')

router.post('/deleteClient', express.json(), async (req, res) => {
    console.log(req.body.ClientCode, "req.body.ClientCode, req.body.user, req.body.DeletionDate");
    try {
<<<<<<< HEAD
        const response =await deletedClientByCode(req.body.ClientCode, req.body.user, req.body.DeletionDate)
=======
        console.log(req.body.ClientCode,'dddddddddddddd');

        const response =await deletedClientByCode(req.body.ClientCode, req.body.user)
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router
