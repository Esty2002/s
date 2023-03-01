const express = require('express')
const router = require('express').Router()

const { createNewLead,newOrderer,newPouringType,selectAllTable } = require('../../modules/leads/create_m')

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
router.get('/getAllTable',async(req,res)=>{
      const result= await selectAllTable(req.body)
      res.send(result)
      
})

router.get('/getRowAccordingToPhone',async(req,res)=>{
    const result= await selectColumn(req.query.phoneNumber,req.query.tableName)
    res.send(result)
    
})


module.exports = router