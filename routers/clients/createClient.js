const express = require('express')
const router = express.Router()
const { addOneClient } = require('../../modules/clients/createClient')
const {checkObjectValidations}=require('../../services/validations/use-validations')
router.post('/add', express.json(), async (req, res) => {
    try {
        
        let ans=await checkObjectValidations(req.body,'tbl_Clients')
        console.log(ans,'gggggggggggggg');
        if(ans){
        
        const response =await addOneClient(req.body)
        
        if (response)
            res.status(201).send(response.data)
        else {
<<<<<<< HEAD
            res.status(500).send(response.data)
=======
            res.status(response.status).send('')
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
        }
       }
       console.log('errrrrrrrorr');

        // res.status(500).send(error.message)
} catch (error) {
    console.log(error.message)
        res.status(500).send(error.message)
    }
})


module.exports = router



