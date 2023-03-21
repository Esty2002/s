const { Router } = require('express')
const express = require('express')
const router = express.Router()

const { postCommunications } = require('../modules/communication')

router.post('/postCommunications', express.json(), async (req, res) => {
    const list = await postCommunications(req.body)
    console.log(list,' list');
    if (list) {
        res.status(200).send(list)
    }
    else {
        res.status(404).send({ans:req.body})
    }
})

module.exports=router;