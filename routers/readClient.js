const express = require('express')
const router = express.Router()
const { getAllClient, getClientsByField, getClientsById } = require('../modules/readClient')

router.get('/getAll', async (req, res) => {
    const allClients = await getAllClient();
    console.log(allClients);
    if (allClients.length > 0)
        res.status(200).send(allClients)
    else
        res.status(200).send(false)

})

router.get('/findClient/:id', async (req, res) => {
    const getClientByid = await getClientsById(req.params.id)
    console.log('------------------------------');
    console.log(getClientByid);
    console.log('------------------------------');
    if (getClientByid != false && getClientByid.length > 0)
        res.status(200).send(getClientByid)
    else
        res.status(200).send(false)

})

router.get('/searchClient/:field/:value', async (req, res) => {
    const getClientByValue = await getClientsByField(req.params.field, req.params.value)
    res.status(200).send(getClientByValue)
})

module.exports = router