const express = require('express')
const router = require('express').Router()

const { newOrderer, newPouringType, selectAllTable, selectRecordByPhoneNumber, nameAndphone, newLeadStatus, deleteFromTable, updateStatus, updateTable } = require('../modules/leads/more-tables')
const { createNewLead, getTheMustConcretItem, updateLead, allLeadsDetails } = require('../modules/leads/leads-options')

router.get('/getpouringtypes',async(req,res)=>{
    const result = await selectAllTable(req.query.name);
    res.status(200).send(result);
})
router.get('/getorderers',async(req,res)=>{
    const result = await selectAllTable(req.query.name);
    res.status(200).send(result);
})



router.get('/getordererbyphone', async (req, res) => {
    const result = await selectRecordByPhoneNumber(req.query.phone, req.query.tableName);
    res.status(200).send({ result: result });

})
router.get('/getconcrettype', async (req, res) => {
    const result = await getTheMustConcretItem();
    res.status(200).send(result);
})
router.get('/getstatuseslead', async (req, res) => {
    const result = await selectAllTable('statusesLead');
    res.status(200).send(result);
})
router.post('/deletepouringtype', express.json(), async (req, res) => {
    const result = await deleteFromTable('pouringTypes', req.body.serialNumber)
    res.status(200).send(result);
})
router.post('/deleteorderer', express.json(), async (req, res) => {
    const result = await deleteFromTable('orderers', req.body.serialNumber)
    res.status(200).send(result);
})

router.post('/createnewlead', express.json(), async (req, res) => {
    const result = await createNewLead(req.body);
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


module.exports = router;
router.post('/updatepouringtype', express.json(), async (req, res) => {
    const result = await updateTable(req.body)
    res.status(200).send(result)
})
router.post('/updateorderer', express.json(), async (req, res) => {
    const result = await updateTable(req.body)
    res.status(200).send(result)
})

router.post('/updateleadsdetails', express.json(), async (req, res) => {
    const result = await updateLead(req.body);
    res.status(200).send(result);

})

router.post('/updatestatuslead', express.json(), async (req, res) => {
    const result = await updateLead(req.body)
    res.status(200).send(result)
})
router.post('/deletelead', express.json(), async (req, res) => {
    req.body.disable = true;
    req.body.deletingDate = new Date().toLocaleDateString();
    const result = await updateLead(req.body)
    res.status(200).send(result)
})
router.post('/newstatus', express.json(), async (req, res) => {
    const result = await newLeadStatus(req.body);
    res.status(200).send(result);
})
router.post('/deletestatus', express.json(), async (req, res) => {
    const result = await deleteFromTable(req.body.serialNumber)
    res.status(200).send(result)
})
router.post('/updatestatus', express.json(), async (req, res) => {
    const result = await updateTable(req.body)
    // const result = await updateStatus(req.body)
    res.status(200).send(result)
})



module.exports = router
