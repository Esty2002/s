const express = require('express')
const router = require('express').Router()

const { createNewLead,newOrderer,newPouringType } = require('../../modules/leads/create_m')

router.post('/createnewlead', express.json(), async (req, res) => {
    const result = await createNewLead(req.body)
    res.send(result)
})

// router.post('/neworderer', express.json(), async (req, res) => {
//     const result = await newOrderer(req.body)
//     res.send(result)
// })

// router.post('/newpouringtype', express.json(), async (req, res) => {
//     const result = await newPouringType(req.body)
//     res.send(result)
// })

module.exports = router