const express = require('express');
const router = express.Router();

const { deletedClientByCode } = require('../../modules/clients/deleteClient')

router.post('/deleteclient', express.json(), async (req, res) => {
    const result = await deletedClientByCode(req.body.ClientCode, req.body.user,req.body.DeletionDate);
    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({code:req.body.code})
})

module.exports = router
