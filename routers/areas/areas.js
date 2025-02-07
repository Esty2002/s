const router = require('express').Router();
const express = require('express');

const { insertArea, findSupplierOrClient, findArea,
    deleteSupplierOrClient, deleteArea, updateArea, findAllCities,
    getTheDataOfTheArea, updateLocation, updatePointAndRadius, findAll, findByDistinct, findInPolygon } = require('../../modules/areas/areas');



router.get('/', async (req, res) => {
    res.send("areas---");
});

router.get('/allcities', async (req, res) => {
    try {
        const ans = await findAllCities();
        console.log(ans);
        res.send(ans);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/isExist', express.json(), async (req, res) => {
    try {
        const result = await findArea(req.body);
        console.log({ data: result.data });
        res.status(200).send(result.data);
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error);
    }
});

router.post('/isExistPoint', express.json(), async (req, res) => {
    console.log("req.params.areaName", req.body);
    try {
        const result = await findArea(req.body);
        console.log({ result });
        res.status(200).send(result.data);
    } catch (error) {
        console.log({ error });
        res.status(500).send(error);
    }
});

// o.k
router.post('/insertArea', express.json(), async (req, res) => {
    try {
        const result = await insertArea(req.body);
        res.status(result.status).send(result.data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

router.post('/dropArea', express.json(), async (req, res) => {
    try {
        const response = await deleteSupplierOrClient(req.body.phone);
        if (response)
            res.status(200).send(response);
        else {
            res.status(500).send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }

});


router.get('/findAll/:filter', async (req, res) => {
    let filter = req.params.filter;
    console.log("filter", filter);
    try {
        const result = await findAll(filter);
        // console.log('***********************', result.data);
        res.status(200).send(result.data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.post('/findInPolygon', express.json(), async (req, res) => {
    console.log({ findInPolygon: req.body });
    try {
        const result = await findInPolygon(req.body);
        // console.log('***********************', result.data);
        res.status(200).send(result.data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.get('/findAllTypes/:collection/:filter', async (req, res) => {
    let collection = req.params.collection;
    let filter = req.params.filter;
    try {
        const result = await findByDistinct(collection, filter);
        // console.log('***********************', result.data);
        console.log({ result });
        res.status(200).send(result.data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.post('/deleteArea', express.json(), async (req, res) => {
    try {
        const areaName = req.body.name;
        console.log('aaaaaaaaa', areaName);
        const response = await deleteArea(areaName);
        if (response)
            res.status(200).send(response.data);
        else {
            res.status(500).send(response.data);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }

});

router.post('/updateArea', express.json(), async (req, res) => {
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

router.post('/updatePointsInArea', express.json(), async (req, res) => {
    try {
        const response = await updateLocation(req.body);
        if (response)
            res.status(200).send(response);
        else {
            res.status(500).send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/updatePointsAndRadiusInArea', express.json(), async (req, res) => {
    try {
        const response = await updatePointAndRadius(req.body);
        if (response)
            res.status(200).send(response);
        else {
            res.status(500).send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//giti...
router.get('/findPointArray/:code/:areaName', async (req, res) => {
    try {
        const response = await getTheDataOfTheArea(parseInt(req.params.code), req.params.areaName);
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