const router = require('express').Router()
const { cache } = require('ejs')
const express = require('express');
const { object } = require('webidl-conversions');

const { insertArea, startt, updateArea, deleteArea, findAreas, findDistinctAreaTypes, getFromSql, getFromMongo, findInPolygon, findInRadius } = require('../../modules/areas/areas');
const { logToFile } = require('../../services/loggerPnini');

// router.get('/', async (req, res) => {
//     const r = await startt()
//     res.send(r.data)
// });


router.get('/', async (req, res) => {
    res.send("areas---")
})

router.get('/allcities', async (req, res) => {
    try {
        const ans = await findAllCities()
        console.log(ans);
        res.send(ans)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/isExist', express.json(), async (req, res) => {
    try {
        const result = await findArea(req.body)
        console.log({ data: result.data })
        res.status(200).send(result.data)
    }
    catch (error) {
        console.log({ error })
        res.status(500).send(error)
    }
})

router.post('/isExistPoint', express.json(), async (req, res) => {
    console.log("req.params.areaName", req.body);
    try {
        const result = await findArea(req.body)
        console.log({ result })
        res.status(200).send(result.data)
    } catch (error) {
        console.log({ error })
        res.status(500).send(error)
    }
})

router.post('/insertArea', express.json(), async (req, res) => {
    let object;
    try {
        object = {
            name: 'insertArea',
            description: 'insertArea in router- in try',
        }
        logToFile(object)
        const result = await insertArea(req.body);
        if (result.status == 201) {
            res.status(result.status).send(result.data);
        }
        else {
            res.status(result.status).send(result.data);
        }
    }
    catch (error) {
        object.error = error.message
        logToFile(object)
        res.status(500).send(error.message);
    }
});

router.get('/findenabledAreas/:type', async(req, res)=>{
    let object;
    try {
        const {type} = req.params;
        object = {
            name: 'findAreas',
            description: 'findAreas in router- in try',
            dataThatRecived: {type}
        }
        logToFile(object)
        const result = await findAreas({type});
        res.status(200).send(result);
    }
    catch (err) {
        object.error = err.message
        logToFile(object)
        res.status(500).send(err);
    }
})


router.post('/findAreas', express.json(), async (req, res) => {
    let object;
    try {
        object = {
            name: 'findAreas',
            description: 'findAreas in router- in try',
            dataThatRecived: req.body
        }
        logToFile(object)
        const result = await findAreas(req.body);
        res.status(200).send(result);
    }
    catch (err) {
        object.error = err.message
        logToFile(object)
        res.status(500).send(err);
    }
});

//temporary router
router.get('/readFromSql', async (req, res) => {
    try {
        const result = await getFromSql();
        res.status(200).send(JSON.stringify(result));
    }
    catch (err) {
        res.status(404).send(err);
    }
});

//temporary router
router.get('/readFromMongo', async (req, res) => {
    try {
        const result = await getFromMongo();
        res.status(200).send(JSON.stringify(result));
    }
    catch (err) {
        res.status(404).send(err);
    }
});

router.post('/searchAreas', express.json(), async (req, res) => {
    let obj = req.body;
    let object;
    try {
        object = {
            name: 'searchAreas',
            description: 'searchAreas in router- in try',
            dataThatRecived: req.body
        }
        logToFile(object)
        let areas = [];
        const citys = await findAreas({ basicName: obj.city, type:'city' });
        const points = await findAreas({ point: obj.point, type: 'point' });
        const radius = await findAreas({ point: obj.point, type: 'radius' });
        const polygon = await findAreas({ point: obj.point, type:'polygon' });
        areas = [ ...citys, ...points,...radius, ...polygon];
        res.status(200).send(areas);
    }
    catch (error) {
        object.error = error.message
        logToFile(object)
        res.status(500).send(error)
    }
});

router.get('/findAllTypes', express.json(), async (req, res) => {
    let object;
    try {
        object = {
            name: 'findAllTypes',
            description: 'findAllTypes in router- in try',
        }
        logToFile(object)
        const result = await findDistinctAreaTypes()
        res.status(200).send(result)
    }
    catch (err) {
        object.error = err.message
        logToFile(object)
        res.status(500).send(err)
    }
});

router.put('/updateArea', express.json(), async (req, res) => {
    let object;
    try {
        object = {
            name: 'updateArea',
            description: 'updateArea in router- in try',
            dataThatRecived: req.body
        }
        logToFile(object)
        const response = await updateArea(req.body);
        if (response.status == 204)
            res.status(204).send(response);
        else {
            res.status(response.status).send(response.data);
        }

    } catch (error) {
        object.error = error.message
        logToFile(object)
        res.status(500).send(error.message);
    }
});

router.post('/deleteArea', express.json(), async (req, res) => {
    let object;
    try {
        object = {
            name: 'deleteArea',
            description: 'deleteArea in router- in try',
            dataThatRecived: req.body
        }
        logToFile(object);
        const response = await deleteArea(req.body);
        if (response)
            res.status(200).send(response);
        else {
            res.status(500).send(response);
        }

    } catch (error) {
        object.error = error.message
        logToFile(object)
        res.status(500).send(error.message);
    }
})

module.exports = router;