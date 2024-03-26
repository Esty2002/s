const express = require('express');
const { updateClient } = require('../../modules/clients/updateClient')
const router = express.Router();


router.put('/update', express.json(), async (req, res) => {
    try {
        const response = await updateClient(req.body);
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router