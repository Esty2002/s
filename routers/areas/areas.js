const router = require('express').Router()
const { cache } = require('ejs')
const express = require('express')

const { insertArea, updateArea, findAreas, findByDistinct, serachByAreas, getFromSql } = require('../../modules/areas/areas')
const { objectsForValidations } = require('../../services/validations/validations-objects')

router.get('/', async (req, res) => {
    res.send("areas---");
});

router.post('/insertArea', express.json(), async (req, res) => {
    try {
        // console.log('before valiiii' ,req.body);
        // const ans = await objectsForValidations(req.body, "tbl_Areas")
        // console.log('after valiiii');

        // if (ans) {
        // console.log(ans);
        const result = await insertArea(req.body);
        if (result) {
            res.status(201).send(result);
        }
        else {
            res.status(500).send();
        }
        // }
        // else

        // console.log('not validate');

    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.post('/findAreas', express.json(), async (req, res) => {
    try {
        const result = await findAreas(req.body);
        console.log('***********************', result);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.get('/readFromSql', async (req, res) => {
    try {
        const result = await getFromSql();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(404).send(err);
    }
});

router.post('/searchAreas', express.json(), async (req, res) => {
    try {
        const result = await serachByAreas(req.body)
        console.log("mmmmmmmmmmm", result);
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

router.post('/findAllTypes', express.json(), async (req, res) => {
    try {
        const result = await findByDistinct(req.body)
        res.status(200).send(result.data)
    }
    catch (err) {
        res.status(500).send(err)
    }
});

router.post('/updateArea', express.json(), async (req, res) => {
    console.log(req.body);
    try {
        const response = await updateArea(req.body);
        if (response)

            res.status(200).send(response);
        else {
            res.status(500).send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
