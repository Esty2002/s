const express = require('express')
const { addOneStatus ,deleteOneStatus, getStatusNumber } = require('../../modules/clients/status')

const router = express.Router()


router.post('/addStatus',express.json(),async(req,res)=>{
    try {
        console.log('sari');
        const response =await addOneStatus(req.body)
        console.log(response,'response');
        if (response)
            res.status(201).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    // _=addOneStatus(req.body)
    // res.status(200).send(true)
})

router.post('/deleteOneStatus',express.json(),async (req,res)=>{
    try {
        const response =await deleteOneStatus(req.body)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    // _=deleteOneStatus(req.body)
    // res.status(200).send(true)

})

router.get('/status', async (req, res) => {
    console.log("router,server");
    try {
        console.log('sarinnnnnn');
        const response =await getStatusNumber()
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router