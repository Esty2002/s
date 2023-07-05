const express = require('express')
const { addOneStatus ,deleteOneStatus, getStatusNumber } = require('../../modules/clients/status')

const router = express.Router()


router.post('/addStatus',express.json(),async(req,res)=>{
    try {
        const response =await addOneStatus(req.body)
        console.log(response,'response');
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
    console.log('status');
    try {
        const response =await getStatusNumber()
<<<<<<< HEAD
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
=======
        console.log('ii',response.status,'statusu');
        res.status(response.status).send(response.data)
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router