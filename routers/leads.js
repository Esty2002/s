const express = require('express')
const router = require('express').Router()

const { newOrderer, newPouringType, selectAllTable, selectRecordByPhoneNumber } = require('../modules/leads/more-tables')
const { createNewLead, getTheMustConcretItem, updateLead, allLeadsDetails } = require('../modules/leads/leads-options')

router.get('/getalltable', async (req, res) => {
    const result = await selectAllTable(req.query.name);
    res.status(200).send(result);

})

router.get('/getrowaccordingtophone', async (req, res) => {

    const result = await selectRecordByPhoneNumber(req.query.phone, req.query.tablename);
    res.status(200).send({ result: result });

})
router.get('/getconcrettype', async (req, res) => {
    const result = await getTheMustConcretItem();
    res.status(200).send(result);
})
router.post('/neworderer', express.json(), async (req, res) => {
    const result = await newOrderer(req.body);
    res.status(200).send(result);
})

router.post('/newpouringtype', express.json(), async (req, res) => {
    const result = await newPouringType(req.body);
    res.status(200).send(result);
})
router.post('/getleadsdetails', express.json(), async (req, res) => {
    const response = await allLeadsDetails(req.body);
    res.status(200).send(response);
})

router.post('/createnewlead', express.json(), async (req, res) => {
    const result = await createNewLead(req.body);
    res.status(200).send(result);
})

router.post('/updateLeadsdetails', express.json(), async (req, res) => {
    const result = await updateLead(req.body, req.body.serialNumber);
    res.status(200).send(result);

})

module.exports = router;