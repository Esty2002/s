const express = require('express')
const router = require('express').Router()

const { createNewLead, getTheMustConcretItem, updateLead, allLeadsDetails } = require('../../modules/leads/leads-options')
const { newOrderer, getOrderers, getOrdererByPhone, deleteOrderer, updateOrderer } = require('../../modules/leads/orderers');
const { newPouringType, getPouringTypes, deletePouringType, updatePouringType } = require('../../modules/leads/pouring-types');
const { newLeadStatus, getStatusesLead, updateStatus, deleteStatus } = require('../../modules/leads/status-leads');

router.get('/getpouringtypes', async (req, res) => {
    try {
        const response = await getPouringTypes();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send({ error });
    }
})
router.get('/getorderers', async (req, res) => {
    try {
        const response = await getOrderers();
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send({ error });
    }

})



router.get('/getordererbyphone/:phone', async (req, res) => {
    try {
        const response = await getOrdererByPhone(req.params);
        res.status(200).send({ response });
    }
    catch (error) {
        res.status(404).send({ error });
    }

})
router.get('/getconcrettype', async (req, res) => {
    try {
        const response = await getTheMustConcretItem();
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }
})
router.get('/getstatuseslead', async (req, res) => {
    try {
        const response = await getStatusesLead();
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }

})
router.post('/deletepouringtype', express.json(), async (req, res) => {
    try {
        const response = await deletePouringType(req.body)
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }
})
router.post('/deleteorderer', express.json(), async (req, res) => {
    try {
        const response = await deleteOrderer(req.body)
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }

})

router.post('/createnewlead', express.json(), async (req, res) => {
    try {
        const response = await createNewLead(req.body);
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }
})
router.post('/neworderer', express.json(), async (req, res) => {
    try {
        const response = await newOrderer(req.body);

        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }
})

router.post('/newpouringtype', express.json(), async (req, res) => {
    try {
        const response = await newPouringType(req.body);
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }
})
router.post('/getleadsdetails', express.json(), async (req, res) => {
    try {
        const response = await allLeadsDetails(req.body);
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });

    }

})

router.post('/updatepouringtype', express.json(), async (req, res) => {
    try {
        const response = await updatePouringType(req.body)
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });

    }

})
router.post('/updateorderer', express.json(), async (req, res) => {
    try {
        const response = await updateOrderer(req.body)
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });

    }
})

router.post('/updateleadsdetails', express.json(), async (req, res) => {
    try {
        const response = await updateLead(req.body);
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });

    }

})

router.post('/updatestatuslead', express.json(), async (req, res) => {
    try {
        const response = await updateLead(req.body)
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });

    }
})
router.post('/deletelead', express.json(), async (req, res) => {
    try {
        req.body.disable = true;
        req.body.deletingDate = new Date().toLocaleDateString();
        const response = await updateLead(req.body)
        res.status(200).send(response)

    }
    catch (error) {
        res.status(404).send({ error });
    }

})
router.post('/newstatus', express.json(), async (req, res) => {
    try {
        const response = await newLeadStatus(req.body);
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }
})
router.post('/deletestatus', express.json(), async (req, res) => {
    try {
        const response = await deleteStatus(req.body)
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }
})
router.post('/updatestatus', express.json(), async (req, res) => {
    try {
        const response = await updateStatus(req.body)
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send({ error });
    }
})



module.exports = router
