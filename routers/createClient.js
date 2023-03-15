const express = require('express')
const router = express.Router()
const { addAllClient } = require('../modules/createClient')

router.post('/add', express.json(), async (req, res) => {
    const result = await addAllClient(req.body);
    if (result == false)
        res.status(200).send(false)
    else
        res.status(200).send(true);
})



module.exports = router

