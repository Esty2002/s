const express = require('express')
const router = require('express').Router()

const { newOrderer, newPouringType, selectAllTable, selectRecordByPhoneNumber, nameAndphone } = require('../modules/leads/sql/create_sql')

const { createNewLead, AllLeadsDetails } = require('../modules/leads/mongo/create_m')

const { getDataSynchronised } = require('../modules/leads/mongo_and_sql/mongo_and_sql')

router.post('/createnewlead', express.json(), async (req, res) => {
    const result = await createNewLead(req.body)
    res.status(200).send(result)
})

router.post('/neworderer', express.json(), async (req, res) => {
    const result = await newOrderer(req.body)
    res.status(200).send(result)
})

router.post('/newpouringtype', express.json(), async (req, res) => {
    const result = await newPouringType(req.body)
    res.status(200).send(result)
})
router.get('/getalltable', async (req, res) => {
    const result = await selectAllTable(req.query.name)
    res.status(200).send(result)

})

router.get('/getRowAccordingToPhone', async (req, res) => {
    const result = await selectRecordByPhoneNumber(req.query.phone, req.query.tableName)
    res.status(200).send(result)

})
router.get('/getAllLeadsDatails', async (req, res) => {
    const sql = await nameAndphone()
    const mongo = await AllLeadsDetails();
    let arr = []
    if (mongo && sql) {
        arr = await getDataSynchronised(sql, mongo)
    }
   
    
    res.status(200).send(arr)
})




module.exports = router