const express = require('express')
const router = require('express').Router()

const { createNewLead,newOrderer,newPouringType,selectAllTable, addNewLead, selectRecordByPhoneNumber } = require('../modules/leads/sql/create_sql')

router.post('/createnewlead', express.json(), async (req, res) => {
    const result = await addNewLead(req.body)
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
router.get('/getalltable',async(req,res)=>{
    console.log(req.query.name);
      const result= await selectAllTable(req.query.name)
      res.send(result)
      
})

router.get('/getRowAccordingToPhone',async(req,res)=>{
    console.log(req.query.phone,req.query.tableName);
    const result= await selectRecordByPhoneNumber(req.query.phone,req.query.tableName)
    res.send(result)
    
})


module.exports = router