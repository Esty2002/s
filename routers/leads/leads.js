const express = require('express');
const router = require('express').Router();

const { createNewLead, updateLead, readLead, deleteLead } = require('../../modules/leads/leads-options');
const { newRecord, getRecord, deleteRecord, updateRecord } = require('../../modules/leads/tables');

router.post('/createnewlead', express.json(), async (req, res) => {
    try {
        const response = await createNewLead(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.post('/getleadsdetails', express.json(), async (req, res) => {
    try {
        const response = await readLead(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.post('/updatelead', express.json(), async (req, res) => {
    try {
        const response = await updateLead(req.body.filter, req.body.obj);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.post('/deletelead/:serialNumber', express.json(), async (req, res) => {
    try {
        req.body.obj.disable = true;
        req.body.obj.deletingDate = new Date();
        const response = await deleteLead(req.params.serialNumber);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.get('/getrecord/:table/:field', async (req, res) => {
    try {
        const response = await getRecord(req.params.table, req.params.field);
        res.status(200).send(response);

    }
    catch (error) {
        res.status(404).send(error);

    }
});

router.post('/insertrecord', express.json(), async (req, res) => {
    try {
        const response = await newRecord(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.put('/updaterecord', express.json(), async (req, res) => {
    try {
        const response = await updateRecord(req.body)
        res.status(200).send(response);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/deleterecord/:tablename/:condition', express.json(), async (req, res) => {
    try {
        const response = await deleteRecord({ tableName: req.params.tablename, condition: req.params.condition })
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});

module.exports = router;
