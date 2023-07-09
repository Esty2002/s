const express = require('express')
const router = express.Router()
const { getAllClient, getClientsByField, getClientsById, getAllDeletedClient } = require('../../modules/clients/readClient')
// const { conversionQueryToObject } = require('../../services/middlewears/conversions')


router.get('/getAll', async (req, res) => {
    try {
        const response = await getAllClient(req.query)
        if (response)
            res.status(200).send(response.data)
        else {
            res.status(500).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})
router.get('/getAllDeleted', async (req, res) => {
    try {
        const allClients = await getAllDeletedClient();
        if (allClients)
            res.status(200).send(allClients.data)
        else
            res.status(404).send({ message: 'NOT FOUND' })
    } catch (error) {
        res.status(500).send(error.message)
    }

})
router.get('/findClient', async (req, res) => {
    // console.log(req.params.id, "req.params.id");
    try {
        const response = await getClientsById(req.query)
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

router.get('/searchClient', async (req, res) => {
    try {
        const response = await getClientsByField(req.query)
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