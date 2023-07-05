const express = require('express')
const router = express.Router()
const { getAllClient, getClientsByField, getClientsById , getAllDeletedClient} = require('../../modules/clients/readClient')


router.get('/getAll', async (req, res) => {
    try {
<<<<<<< HEAD
        const response =await getAllClient()
        console.log(response, "------------------------resd");
        if (response)
            res.status(200).send(response.data)
=======
        
        const response = await getAllClient(req.body);
        if (response.data) {
            res.status(200).send(response.data)
            
        }
>>>>>>> 63a33c51915dfc6cb6ef698b866160b8181b9741
        else {
            res.status(500).send(response.data)
        }
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})
router.get('/getAllDeleted', async (req, res) => {   
    const allClients = await getAllDeletedClient();
    if (allClients)
        res.status(200).send(allClients.data)
    else
        res.status(404).send({message:'NOT FOUND'})

})
router.get('/findClient/:id', async (req, res) => {
    console.log(req.params.id, "req.params.id");
    try {
        const response = await getClientsById(req.params.id)
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
        // res.status(404).send({message:req.params.id})
    }
})

router.get('/searchClient/:field/:value', async (req, res) => {
    try {
        const response = await getClientsByField(req.params.field, req.params.value)
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
        // res.status(404).send({message:req.params.value})
    }
})

module.exports = router