const express = require('express');
const { getClientByClientCode, updateClient, getStatusNumber } = require('../modules/updateClient')
const router = express.Router();

router.get('/getClientForUpdate/:password', async (req, res) => {
    const result = await getClientByClientCode(req.params.password);
    // console.log(result + ' result in router');
    res.send(result);
})

router.post('/update', express.json(), async (req, res) => {
    await updateClient(req.body);
    res.send(true);
})
router.get('/status', async (req, res) => {
    console.log( '-------------------------------');
    const result = await getStatusNumber()
    res.send(result)
})


module.exports = router