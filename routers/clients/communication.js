const express = require('express')
const router = express.Router()

const { postCommunications } = require('../../modules/clients/communication')

router.post('/postCommunications', express.json(), async (req, res) => {
    const list = await postCommunications(req.body)
    if (list) {
        res.status(200).send(list)
    }
    else {
        res.status(404).send({data:req.body})
    }
})

module.exports=router;