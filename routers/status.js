const express = require('express')
const { addOneStatus ,deleteStatus} = require('../modules/status')

const router = express.Router()


router.post('/addStatus',express.json(),(req,res)=>{
    _=addOneStatus(req.body)
    res.status(200).send(true)
})

router.post('/deleteOneStatus',express.json(),(req,res)=>{
    _=deleteStatus(req.body)
    res.status(200).send(true)

})
module.exports = router