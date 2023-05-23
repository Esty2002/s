const express = require('express');
const { updateClient } = require('../../modules/clients/updateClient')
const router = express.Router();


router.post('/update', express.json(), async (req, res) => {
    await updateClient(req.body);
    res.send(true);
})

module.exports = router