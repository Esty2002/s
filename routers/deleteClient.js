const express = require('express');
const router = express.Router();

const { deletedClientByCode } = require('../modules/deleteClient')

router.post('/deleteClient', express.json(), async (req, res) => {
    const result = await deletedClientByCode(req.body.code, req.body.user);
    if (result)
        res.send(result);
    return result;
})

module.exports = router
