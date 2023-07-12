const router = require('express').Router()
const { cache } = require('ejs')
const express = require('express');
const { object } = require('webidl-conversions');

const { insertArea,startt, updateArea, deleteArea, findAreas, findByDistinct, getFromSql, getFromMongo, findInPolygon,findInRadius } = require('../../modules/areas/areas');
const { logToFile } = require('../../services/loggerPnini');

router.get('/', async (req, res) => {
    const r = await startt()
    res.send(r.data)
});

router.post('/insertArea', express.json(), async (req, res) => {
    let object;
    try {
        object = {
            name: 'insertArea',
            description: 'insertArea in router- in try',
            dataThatRecived: req.body
        }
        logToFile(object)
        const result = await insertArea(req.body);
        if (result) {
            res.status(201).send(result);
        }
        else {
            res.status(500).send();
        }
    }
    catch (error) {
        object.error = error.message
        logToFile(object)
        res.status(500).send(error);
    }
});

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
        console.log('***********************', result);
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
    let obj = req.body

    let object;
    try {
        object = {
            name: 'searchAreas',
            description: 'searchAreas in router- in try',
            dataThatRecived: req.body
        }
        logToFile(object)
        let areas = [];
        const citys = await findAreas({ basicName: obj.city });
        const points = await findAreas({ point: obj.point, type: 'point' });
        // const radius = await findAreas({ type: 'radius' });
        const radius = await findInRadius({ point: obj.point,type: 'radius' });
        // //--------------------------------------
        // db.getCollection('tA').aggregate([
        //     {
        //       $geoNear: {
        //         near: {
        //           type: "Point",
        //           coordinates: [31.2712026, 35.2130481] 
        //         },
        //         distanceField: "calculatedDist",
        //         maxDistance: 4500,
        //       spherical: true
        //       }
        //     },
        //     {$match: {$expr: {$gte:['$radius', '$calculatedDist']},filter}}
        //   ])
// ---------------
        // key: 'gpsLocation',

// -----------------
        //   {
        //       "_id" : ObjectId("626ef666653cf1987b9fefba"),
        //       "cirleName" : "test",
        //       "radius" : 5500000, // meters
        //       "gpsLocation" : {
        //           "type" : "Point",
        //           "coordinates" : [0, 0] // circle center point geoJson coordinates
        //       }
        //   },
        //   {
        //       "_id" : ObjectId("626ef695653cf1987b9feff3"),
        //       "cirleName" : "test1",
        //       "radius" : 100000, // meters
        //       "gpsLocation" : {
        //           "type" : "Point",
        //           "coordinates" : [0, 80] // circle center point geoJson coordinates
        //       }
        //   },
        //   {
        //       "_id" : ObjectId("626ef6a9653cf1987b9ff001"),
        //       "cirleName" : "test2",
        //       "radius" : 7000000, // meters
        //       "gpsLocation" : {
        //           "type" : "Point",
        //           "coordinates" : [40, 40] // circle center point geoJson coordinates
        //       }
        //   }

        // db.places.find( {
        //     loc: { $geoWithin: { $centerSphere: [ [ -88, 30 ], 10/3963.2 ] } }
        //   } )

        // db.restaurants.find({ location:
        //     { $geoWithin:
        //        { $centerSphere: [ [ -73.93414657, 40.82302903 ], 5 / 6378.1 ] } } })

        // db.places.find(
        //     { loc: { $geoWithin: { $center: [ [-74, 40.74], 10 ] } } }
        //  )
        //--------------------------------------

        const polygon = await findInPolygon({ point: obj.point });
        areas = [...areas, ...citys, ...points, ...radius, ...polygon];
        console.log('popopopo',radius);
        res.status(200).send(areas)
    }
    catch (error) {
        object.error = error.message
        logToFile(object)
        res.status(500).send(error)
    }
});

router.post('/findAllTypes', express.json(), async (req, res) => {
    let object;
    try {
        object = {
            name: 'findAllTypes',
            description: 'findAllTypes in router- in try',
            dataThatRecived: req.body
        }
        logToFile(object)
        const result = await findByDistinct(req.body)
        res.status(200).send(result.data)
    }
    catch (err) {
        object.error = err.message
        logToFile(object)
        res.status(500).send(err)
    }
});

router.post('/updateArea', express.json(), async (req, res) => {
    let object;
    try {
        object = {
            name: 'updateArea',
            description: 'updateArea in router- in try',
            dataThatRecived: req.body
        }
        logToFile(object)
        const response = await updateArea(req.body);
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
