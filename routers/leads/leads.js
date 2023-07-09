const express = require('express');
const router = require('express').Router();

const { createNewLead, updateLead, readLead, deleteOneLead, deleteLead, readforeignkeyvalue } = require('../../modules/leads/leads-options');
const { newRecord, getRecord, deleteRecord, updateRecord } = require('../../modules/leads/tables');

router.post('/createnewlead', express.json(), async (req, res) => {
    try {
        const response = await createNewLead(req.body);
        if (response.status === 201) {
            res.status(response.status).send(response.data);
        }
        else {
            res.status(500).send(response.message);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.get('/getleads/:condition/:disable', express.json(), async (req, res) => {
    try {
        const response = await readLead(req.params.condition !== "{condition}" ? req.params.condition : null, req.params.disable);
        if (response.status === 200)
            res.status(200).send(response.data);
        else {
            res.status(500).send(response.message)
        }

    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/getforeignkeyvalue/:tablename/:field/:id', express.json(), async (req, res) => {

    try {
        const response = await readforeignkeyvalue({ tablename: req.params.tablename, field: req.params.field, id: req.params.id });
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send(error);
    }
});


router.put('/updatelead', express.json(), async (req, res) => {
    try {
        const response = await updateLead(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/deletelead/:serialNumber', express.json(), async (req, res) => {
    try {
        const response = await deleteLead(req.params.serialNumber);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/deleteonelead/:serialNumber', express.json(), async (req, res) => {
    try {

        const response = await deleteOneLead(req.params.serialNumber);
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});

router.get('/getrecord/:entity/:prop', async (req, res) => {
    try {
        const response = await getRecord(req.params.entity, req.params.prop);
        if (response.status === 200) {
            res.status(200).send(response.data);
        }

        else {
            res.status(500).send(response.message);
        }


    }
    catch (error) {
        res.status(500).send(error.message);

    }
});

router.post('/insertrecord', express.json(), async (req, res) => {
    try {
        const response = await newRecord(req.body);
        if (response.status === 201) {
            res.status(201).send(response.data);
        }
        else {
            console.log(response);
            res.status(500).send(response.message);

        }

    }
    catch (error) {
        console.log({error});
        res.status(500).send(error);
    }
});

router.put('/updaterecord', express.json(), async (req, res) => {
    try {
        const response = await updateRecord(req.body)
        if (response.status === 204)
            res.status(204).send(response.data);
        else{
            res.status(500).send(response.message);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/deleterecord/:entityname/:condition', express.json(), async (req, res) => {
    try {
        const response = await deleteRecord({ entity: req.params.entityname, condition: req.params.condition })
        if (response.status == 200) {
            console.log(response.data);
            res.status(204).send(response.data);

        }
        else {
            console.log(response.message);
            res.status(500).send(response.message)
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

module.exports = router;
