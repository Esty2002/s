const express = require('express')
const router = express.Router()
const { addOneClient } = require('../../modules/clients/createClient')
const {checkObjectValidations}=require('../../services/validations/use-validations')
router.post('/add', express.json(), async (req, res) => {
    try {
        let ans=await checkObjectValidations(req.body,'Clients')
        if(ans){
        const response =await addOneClient(req.body)
        if (response.status == 201)
            res.status(201).send(response.data)
        else {
            res.status(response.status).send('')
        }
       }

} catch (error) {
    console.log(error.message)
        res.status(500).send(error.message)
    }
})


module.exports = router



