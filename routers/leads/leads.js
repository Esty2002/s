const express = require('express');
const router = require('express').Router();

const { createNewLead, updateLead, readLead, deleteOneLead, deleteLead, readforeignkeyvalue } = require('../../modules/leads/leads-options');
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
// "/leads/getleads/{condition}"

router.get('/getleads/:condition', express.json(), async (req, res) => {
    try {

        console.log("444444444444444444444444444444444444444444",req.params.condition);
        const response = await readLead(req.params.condition !== "{condition}" ? req.params.condition : null);
        // console.log(response);
        console.log("fffffffffffffffffffffffffffffffsssssssssssss");

        res.status(200).send(response);
    }
    catch (error) {
        // console.log(error);
        res.status(404).send(error);
    }
});

router.get('/getforeignkeyvalue/:tablename/:field/:id', express.json(), async (req, res) => {

    try {
        console.log("ppppppppppp", req.params.tablename);
        const response = await readforeignkeyvalue({ tablename: req.params.tablename, field: req.params.field, id: req.params.id });
        res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
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
        console.log("lll");
        const response = await deleteLead(req.params.serialNumber);
        res.status(200).send(response);
    }
    catch (error) {
        console.log("hhh");

        console.log(error);
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
