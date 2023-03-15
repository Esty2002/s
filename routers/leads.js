const express = require('express')
const router = require('express').Router()

const { newOrderer, newPouringType, selectAllTable, selectRecordByPhoneNumber } = require('../modules/leads/sql/create_sql')
const {createNewLead,getTheMustConcretItem} = require('../modules/leads/mongo/create_m')


router.post('/createnewlead', express.json(), async (req, res) => {
    const result = await createNewLead(req.body);
    console.log(result);
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
router.get('/getalltable', async (req, res) => {
    const result = await selectAllTable(req.query.name);
    res.status(200).send(result);

})

router.get('/getRowAccordingToPhone', async (req, res) => {
    console.log("hello");

    const result = await selectRecordByPhoneNumber(req.query.phone, req.query.tableName);
    console.log(result);
    res.status(200).send({result:result});

})
router.get('/getconcrettype',async(req,res)=>{
    const result=await getTheMustConcretItem();
    res.status(200).send(result);
})


module.exports = router