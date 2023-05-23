const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient, findAreaOfSupplierOrClient,
    deleteSupplierOrClient, deleteArea, updateArea, findAreaByCode,
    getTheDataOfTheArea, updateLocation, updatePointAndRadius } = require('../../modules/price-list/areas')



router.get('/', (req, res) => {
    res.send('into router...')
})

// o.k
router.get('/isExist/:code', async (req, res) => {
    console.log("in isExist ", req.params.code);
    const phone = req.params.code
    try {
        const result = await findSupplierOrClient(phone)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})

// o.k
router.post('/insertArea', express.json(), async (req, res) => {
    // מקבל את כל האובייקט שצריך להכניס למונגו
    try {
        const result = await insertArea(req.body)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }
})


router.post('/updateArea', express.json(), async (req, res) => {
    try {
        const result = await updateArea(req.body)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }

})
// giti
router.post('/updatePointsInArea', express.json(), async (req, res) => {
    console.log("updatePointsInArea");
    console.log(req.body);
    try {
        const result = await updateLocation(req.body)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send({ error })
    }
})

// giti
router.post('/updatePointsAndRadiusInArea', express.json(), async (req, res) => {
    try {
        const result = await updatePointAndRadius(req.body)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }
})

// o.k
router.post('/deleteAreaDetail', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון,שם אזור} ב
    let phone = req.body.phone
    let nameArea = req.body.areaName
    console.log("reqqqqqqqqqqqqqqqqqqqqq ", req.body);

    try {
        const result = await deleteArea(phone, nameArea)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(404).send(error)
    }

})

// o.k
router.post('/deleteArea', express.json(), async (req, res) => {
    //req.body צריך לקבל מס' {טלפון} ב
    try {
        const result = await deleteSupplierOrClient(req.body.phone)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
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
        const result = await findAreaByCode(req.params.code)
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }

})

//giti...
router.get('/findPointArray/:code/:areaName', async (req, res) => {
    console.log("findPointArray/:code/:areaName");
    try {
        const result = await getTheDataOfTheArea(parseInt(req.params.code), req.params.areaName)
        console.log("result findPointArray", { result });
        res.status(200).send(result[0].areas[0])
    } catch (error) {
        res.status(404).send(error)
    }
})


//מקבל קוד ספק/לקוח וכן שם אזור
// בודק האם אזור זה קיים 
router.get('/findAreaOfSupplierOrClient', async (req, res) => {
    const result = await findAreaOfSupplierOrClient(req.query.code, req.query.areaName)
    res.status(200).send(result)
})



module.exports = router