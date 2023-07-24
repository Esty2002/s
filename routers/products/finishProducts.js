const express = require('express');
const router = express.Router();
const { findFinishProduct, insertFinishProduct, updateFinishProduct } = require('../../modules/products/finishProducts');
const { logToFile } = require('../../services/logger/logTxt');


router.post('/create', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'create',
        description: 'insert finished product in router',
        dataThatRecived: req.body
    };
    logToFile(objectForLog);
    try {
        const response = await insertFinishProduct(req.body, 'FinishProducts');
        if (response === true)
            res.status(201).send(response);
        else
            res.status(500).send(response);
    }
    catch (error) {
        objectForLog.error = error.message;
        logToFile(objectForLog);
        if (error instanceof Array)
            res.status(500).send(error);
        else
            res.status(500).send(error.message);

    }
});

router.post('/update', express.json(), async (req, res) => {
    console.log('router', req.body);
    try {
        const response = await updateFinishProduct({ data: req.body.update, condition: req.body.where });
        if (response) {
            res.status(200).send(response);
        }
        else {
            res.status(500).send(response);
        }
    }
    catch (error) { res.status(404).send(error.message) }
});

router.post('/delete', express.json(), async (req, res) => {
    try {
        const response = await updateFinishProduct({ data: { Enabled: 0, DeleteDate: new Date() }, condition: req.body });
        if (response)
            res.status(200).send(response);
        else
            res.status(500).send(response);
    }
    catch (error) { res.status(500).send(error.message) }
});

router.post('/find', express.json(), async (req, res) => {
    let objectForLog = {
        name: 'find',
        description: 'find  finished product in router',
        arr: req.body.arr,
        condition: req.body.where
    };
    logToFile(objectForLog);
    try {
        const response = await findFinishProduct(req.body.arr, req.body.where);
        res.status(200).send(response);
    }
    catch (error) {
        objectForLog.error = error.message;
        logToFile(objectForLog);
        res.status(500).send(error.message);
    }
});

module.exports = router;