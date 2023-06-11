const express = require('express')
const router = express.Router()
const { getAllClient, getClientsByField, getClientsById } = require('../../modules/clients/readClient')


router.get('/getAll', async (req, res) => {   
    const allClients = await getAllClient();
    console.log(allClients.data);
    if (allClients.data)
        res.status(200).send(allClients.data)
    else
        res.status(404).send({message:'NOT FOUND'})
    console.log();

})

router.get('/findClient/:id', async (req, res) => {
    const getClientByid = await getClientsById(req.params.id)
    if (getClientByid )
        res.status(200).send(getClientByid)
    else
        res.status(404).send({message:req.params.id})

})

router.get('/searchClient/:field/:value', async (req, res) => {
    const getClientByValue = await getClientsByField(req.params.field, req.params.value)
    if (getClientByValue)
        res.status(200).send(getClientByValue)
    else
        res.status(404).send({message:req.params.value})
})

module.exports = router