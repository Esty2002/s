const express = require('express')
const { addOneStatus ,deleteOneStatus, getStatusNumber } = require('../../modules/clients/status')

const router = express.Router()


router.post('/addStatus',express.json(),async(req,res)=>{
    try {
        const response =await addOneStatus(req.body)
<<<<<<< HEAD
        // console.log(response,'response');
=======
>>>>>>> 0acb9685a52e32e53d0378b70fecf84264888e53
        if (response)
            res.status(201).send(response.data)
        else {
            res.status(500).send(response.data)
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
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

    // _=deleteOneStatus(req.body)
    // res.status(200).send(true)

})

router.get('/status', async (req, res) => {
    try {
        const response =await getStatusNumber()
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router