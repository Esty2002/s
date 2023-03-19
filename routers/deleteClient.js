const express = require('express');
const router = express.Router();

const { deletedClientByCode } = require('../modules/deleteClient')

router.post('/deleteClient', express.json(), async (req, res) => {
console.log(req.body.code, req.body.user);
    const result = await deletedClientByCode(req.body.code, req.body.user);
    console.log(result , ' in router');
    if (result)
        console.log("client deleted in success.");
    res.send(result);
    return result;
})

module.exports = router
