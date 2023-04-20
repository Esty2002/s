const express = require('express')
const { addOneStatus ,deleteOneStatus, getStatusNumber } = require('../../modules/clients/status')

const router = express.Router()


router.post('/addStatus',express.json(),(req,res)=>{
    _=addOneStatus(req.body)
    res.status(200).send(true)
})

router.post('/deleteOneStatus',express.json(),(req,res)=>{
    _=deleteOneStatus(req.body)
    res.status(200).send(true)

})

router.get('/status', async (req, res) => {
    const result = await getStatusNumber()
    res.send(result)
});

module.exports = router