const express = require('express')
const router = require('express').Router()

const { newOrderer, newPouringType, selectAllTable, selectRecordByPhoneNumber, nameAndphone } = require('../modules/leads/sql/create_sql')
const { createNewLead, getTheMustConcretItem, updateLead, AllLeadsDetails,leadsbyserialnumber } = require('../modules/leads/mongo/create_m')


const { getDataSynchronised } = require('../modules/leads/mongo_and_sql/mongo_and_sql')

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
    res.status(200).send({ result: result });

})
router.get('/getconcrettype', async (req, res) => {
    const result = await getTheMustConcretItem();
    res.status(200).send(result);
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


router.post('/updateLeadsDetails', express.json(), async (req, res) => {
    const result = await updateLead(req.body)
    res.status(200).send(result)

})
router.get('/getstatuseslead', async (req, res) => {
    const result = await selectAllTable('statusesLead');
    res.status(200).send(result.recordset);
})
router.post('/updatestatuslead', express.json(), async (req, res) => {
    const result = await updateLead(req.body)
    res.status(200).send(result)
})
router.post('/deletelead',express.json(), async (req, res)=>{
    req.body.disable=true;
    req.body.deletingDate=new Date().toLocaleDateString();
    const result = await updateLead(req.body)
    res.status(200).send(result)
})


module.exports = router