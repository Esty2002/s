const express = require('express');
const { getClientByClientCode, updateClient } = require('../modules/updateClient')
const router = express.Router();

router.get('/getClientForUpdate/:password', async (req, res) => {
    const result = await getClientByClientCode(req.params.password);
    res.send(result);
})

router.post('/update', express.json(), async (req, res) => {
    await updateClient(req.body);
    res.send(true);
})

module.exports = router