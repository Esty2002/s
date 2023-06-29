const router = require('express').Router()
const { cache } = require('ejs')
const express = require('express')

const { insertArea, findSupplierOrClient, findArea,
    deleteSupplierOrClient, deleteArea, updateArea, findAreas,
    getTheDataOfTheArea, updateLocation, updatePointAndRadius, findAll, findByDistinct, findAreaWithRadius,findInPolygon } = require('../../modules/areas/areas')



router.get('/', async (req, res) => {
    res.send("areas---")
})

router.get('/allcities', async (req, res) => {
    console.log('allcities')
    const ans = await findAllCities()
    console.log(ans);
    res.send(ans)
})

router.post('/isExist', express.json(), async (req, res) => {
    console.log("in isExist ", req.body);
    try {
        const result = await findArea(req.body)
        console.log('-*-*-*-*-*-*-*-*-*-', result);

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

// o.k
router.post('/insertArea', express.json(), async (req, res) => {
    try {
        const result = await insertArea(req.body)
        if (result) {
            console.log("result in router insertArea", result);
            res.status(201).send(result)
        }
        else
            res.status(500).send()
    }
    catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post('/searchAreas', express.json(), async (req, res) => {
    try {
        let areas = []
        if (req.body.city) {
            const citys = await findAreas({ basicName: req.body.city })
            // console.log('ppppppppppppppppppppppppp');
            // citys.forEach(c =>{console.log(c);});
            citys.forEach(c => {
                areas = [...areas, c]
            })
        }
        const points = await findAreas({ point: req.body.point, type: 'point' })
        points.forEach(p => {
            areas = [...areas, p]
        })
        console.log('after point');
        const radius = await findAreas({ type: 'radius' })
        console.log('uuuuuuuuuuu',radius.length);
        radius.forEach(r => {
            areas = [...areas, r]
        })
        console.log('wwwwwwwwwwwwwwwwwwwww', areas);
        res.status(200).send(areas)
    }
    catch (err) {

    }
})
router.post('/dropArea', express.json(), async (req, res) => {
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
        // console.log('***********************', result.data);
        res.status(200).send(result.data)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.get('/findAllTypes/:collection/:filter', async (req, res) => {
    let collection = req.params.collection;
    let filter = req.params.filter
    try {
        const result = await findByDistinct(collection, filter)
        console.log('***********************', result.data);
        res.status(200).send(result.data)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

router.post('/deleteArea', express.json(), async (req, res) => {
    try {
        const areaName = req.body.name
        console.log('aaaaaaaaa', areaName);
        const response = await deleteArea(areaName)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
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
router.post('/findInPolygon' ,express.json(), async (req, res) => {
    console.log({findInPolygon:req.body})
     try {
         const result = await findInPolygon(req.body)
         // console.log('***********************', result.data);
         res.status(200).send(result.data)
     }
     catch (err) {
         res.status(500).send(err)
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