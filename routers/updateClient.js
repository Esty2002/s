const express = require('express')
const { getClientByClientCode, updateClient } = require('../modules/updateClient')
const router = express.Router();

router.get('/getClientForUpdate/:password', async (req, res) => {
    console.log('in get client');
    console.log(req.params.password, ' req');
    const result = await getClientByClientCode(req.params.password);
    console.log(result + ' result in router');
    res.send(result);
})

router.post('/update', express.json(), async (req, res) => {
    console.log(req.body, ' in update client');
    await updateClient(req.body);//send to the func in module
    res.send(true);
})

module.exports = router