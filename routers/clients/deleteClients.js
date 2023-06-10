const express = require('express');
const router = express.Router();

const { deletedClientByCode } = require('../../modules/clients/deleteClient')

router.post('/deleteClient', express.json(), async (req, res) => {
    console.log(req.body,'rrrrreeeeee');
    const result = await deletedClientByCode(req.body.code, req.body.user);
    if (result)
        res.status(200).send(result);
    else
        res.status(404).send({code:req.body.code})
})

module.exports = router