const express = require('express')
const router = require('express').Router()

const { newOrderer, newPouringType, selectAllTable, selectRecordByPhoneNumber } = require('../modules/leads/sql/create_sql')
const { createNewLead } = require('../modules/leads/mongo/create_m')

router.get('/getalltable', async (req, res) => {
    console.log(req.query.name);
    const result = await selectAllTable(req.query.name)
    res.send(result)

})

router.get('/getRowAccordingToPhone', async (req, res) => {
    console.log(req.query.phone, req.query.tableName);
    const result = await selectRecordByPhoneNumber(req.query.phone, req.query.tableName)
    res.send(result)

})
router.post('/createnewlead', express.json(), async (req, res) => {
    const result = await createNewLead(req.body)
    res.send(result)
})

router.post('/neworderer', express.json(), async (req, res) => {
    const result = await newOrderer(req.body)
    res.send(result)
})

router.post('/newpouringtype', express.json(), async (req, res) => {
    const result = await newPouringType(req.body)
    res.send(result)
})




module.exports = router