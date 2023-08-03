const express = require('express')
const router = express.Router()
const { getAllClient, getClientsByField, getClientsById, getAllDeletedClient } = require('../../modules/clients/readClient')


router.get('/getAll', async (req, res) => {
    try {
        const response = await getAllClient()
        if (response)
            res.status(200).send(response.data)


        else {
            res.status(500).send(response.data)
        }
    }
    catch (error) {
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
router.get('/findClient/:id', async (req, res) => {
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