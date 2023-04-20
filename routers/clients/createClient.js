const express = require('express')
const router = express.Router()
const { addOneClient } = require('../../modules/clients/createClient')

router.post('/add', express.json(), async (req, res) => {
    const result = await addOneClient(req.body);
    if (result == false)
        res.status(200).send(false)
    res.status(200).send(true);
})


module.exports = router



