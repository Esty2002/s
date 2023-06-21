const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient, findArea,
    deleteSupplierOrClient, deleteArea, updateArea,
    getTheDataOfTheArea, updateLocation, updatePointAndRadius, findAll, findByDistinct } = require('../../modules/areas/areas')



router.get('/', async (req, res) => {
    res.send("areas---")
})

router.get('/allcities', async (req, res) => {
    console.log('allcities')
    const ans = await findAllCities()
    console.log(ans);
    res.send(ans)
})

router.get('/isExist/:areaName', async (req, res) => {
    console.log("in isExist ", req.params.areaName);

    try {
        const result = await findArea(req.params.areaName)
        console.log({ result })
        res.status(200).send(result.data)
    } catch (error) {
        console.log({ error })
        res.status(500).send(error)
    }
})

// o.k
router.post('/insertArea', express.json(), async (req, res) => {
    // מקבל את כל האובייקט שצריך להכניס למונגו
    console.log("llllllllllllll", { req });
    console.log("req.body", req.body);
    try {
        const result = await insertArea(req.body)
        if (result)
            res.status(201).send(result)
            else
            res.status(500).send()
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// router.get('/findAllAreas', async (req, res) => {
//     try {
//         const result = await findAll()
//         console.log('-------',result);
//         res.status(200).send(result)
//     }
//     catch (err) {
//         res.status(500).send(err)
//     }
// })

router.get('/findAll/:filter', async (req, res) => {
    let filter = req.params.filter
    console.log("filter", filter);
    try {
        const result = await findAll(filter)
        console.log('***********************', result.data);
        res.status(200).send(result.data)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.get('/findAllTypes/:collection/:filter', async (req, res) => {
    let filter = req.params.filter;
    let collection = req.params.collection;
    console.log("filter in router", filter);
    try {
        const result = await findByDistinct(collection,filter)
        console.log('***********************', result.data);
        res.status(200).send(result.data.response)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.post('/updateArea', express.json(), async (req, res) => {
    try {
        const response = await updateArea(req.body)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})
// giti
router.post('/updatePointsInArea', express.json(), async (req, res) => {
    try {
        const response = await updateLocation(req.body)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// giti
router.post('/updatePointsAndRadiusInArea', express.json(), async (req, res) => {
    try {
        const response = await updatePointAndRadius(req.body)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// o.k
router.post('/deleteAreaDetail', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון,שם אזור} ב
    let phone = req.body.phone
    let nameArea = req.body.areaName

    try {
        const response = await deleteArea(phone, nameArea)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// o.k
router.post('/deleteArea', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון} ב
    try {
        const response = await deleteSupplierOrClient(req.body.phone)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})



// למה צריך את זה - זה כמו הבא אחריו
// router.get('/findAllAreas/:code', async (req, res) => {
//     try {
//         const result = await findAreaByCode(req.params.code)
//         res.status(200).send(result)
//     } catch (error) { 
//         res.status(404).send(error)
//     }

// })

router.get('/findAreasByCode/:code', async (req, res) => {
    try {
        const response = await findAreaByCode(req.params.code)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//giti...
router.get('/findPointArray/:code/:areaName', async (req, res) => {
    try {
        const response = await getTheDataOfTheArea(parseInt(req.params.code), req.params.areaName)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// //מקבל קוד ספק/לקוח וכן שם אזור
// // בודק האם אזור זה קיים 
// router.get('/findAreaOfSupplierOrClient', async (req, res) => {
//     const result = await findAreaOfSupplierOrClient(req.query.code, req.query.areaName)
//     res.status(200).send(result)
// })



module.exports = router