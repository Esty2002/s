<<<<<<< HEAD
const express = require('express')
const router = express.Router()
=======
const express=require('express')
const router=express.Router()
>>>>>>> pricelist3
const { logToFile } = require('../../services/logger/logTxt')

const { getAllPriceList, getPriceListByIdSupplierOrClientCode, getPriceListByIdPriceListId
    , getPriceListByAdditionsForDistance, getPriceListByAdditionsForCities, getPriceListByAdditionsForTime, getPriceListByAdditionsForTruckFill, getSupplierByNameProduct, getSupplierByNameProductBuyton } = require('../../modules/pricelist/readPricelist')


router.get('/findAllPriceList', async (req, res) => {
<<<<<<< HEAD
    objectLog = {
        name: 'findAllPriceList',
        description: 'findAllPriceList in router',
    }
    try {
        logToFile(objectLog)
        const result = await getAllPriceList();
        res.status(200).send(result);
    }
=======
    try {
        const result = await getAllPriceList();
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }


})
//FindPriceListByProduct/
// חיפוש מחירון לפי ID
// router.get('/FindPriceListById/:id', async (req, res) => {
//     try {
//         const result = await getPriceListById(req.params.id);
//             res.status(200).send(result);
//     } 
//     catch (error) {
//         res.status(500).send(error);
//     }


// })
// פונקצית חיפוש מחירון לפי תאריך הוספה
// router.get('/FindPriceListByAddedDate/date', async (req, res) => {
//     try {
//         const result = await getPriceListByAddedDate(req.params.date);
//             res.status(200).send(result);
//     } 
//     catch (error) {
//         res.status(500).send(error);
//     }


// })
// פונקציית חיפוש על פי מוצר
router.get('/FindPriceListByProduct/:product', async (req, res) => {
    try {
        console.log(req.params.product,' req.params.product');
        const result = await getPriceListbyProduct(req.params.product);
            res.status(200).send(result);
    } 
>>>>>>> pricelist3
    catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error);
    }
})
<<<<<<< HEAD

// // // חיפוש הצעת מחיר עפ מספר מחירון  לפי ספק 
=======
// הפונקציה מקבלת שם אזור ומחזירה מחירון שקשורה אליו
// router.get('/FindPriceListByAreaId/:area', async (req, res) => {
//     console.log(req.params.area);

//     try {
//         const ans =await getPriceListByAreaId(req.params.area)
//         res.status(200).send(ans)
//     } catch (error) {
//         res.status(500).send(error.message)

//     }
// })
// הפונקציה מקבלת שם אזור ומחזירה מחירון שקשורה אליו
// router.get('/FindPriceListBySupplerCodeOrClientCode/:code', async (req, res) => {
//     console.log(req.params.code);
//     try {
//         const ans =await getPriceListbySupplierCodeOrClientCode(req.params.code)
//         console.log(ans);
//         res.status(200).send(ans)
//     } catch (error) {
//         res.status(404).send(error)

//     }
// })
// חיפוש הצעת מחיר עפ מספר מחירון  לפי ספק 
>>>>>>> pricelist3
router.get('/FindPriceListByIdSupplierOrClientCode/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByIdSupplierOrClientCode',
        description: 'FindPriceListByIdSupplierOrClientCode in router',
    }
    try {
<<<<<<< HEAD
        logToFile(objectLog)
=======
>>>>>>> pricelist3
        const ans = await getPriceListByIdSupplierOrClientCode(req.params.id)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
//חיפוש מוצר על פי מספר  מחירון
router.get('/FindPriceListByProduct/:id', async (req, res) => {
<<<<<<< HEAD
    objectLog = {
        name: 'FindPriceListByProduct',
        description: 'FindPriceListByProduct in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getPriceListByIdPriceListId(req.params.id)
=======
    try {
        const ans = await getPriceListByIdPriceListId(req.params.id)
        console.log(ans);
>>>>>>> pricelist3
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
// router.get('/FindPriceListByProduct/:id', async (req, res) => {
//     try {
//         const ans =await getNameOfProduvtsById(req.params.id)
//         console.log(ans);
//         res.status(200).send(ans)
//     } catch (error) {
//         res.status(404).send(error)

//     }
// })
//  חיפוש מחירון לפי תוספת לפי מרחק
router.get('/FindPriceListByAdditionsForDistance/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForDistance',
        description: 'FindPriceListByAdditionsForDistance in router',
    }
    try {
<<<<<<< HEAD
        logToFile(objectLog)
=======
>>>>>>> pricelist3
        const ans = await getPriceListByAdditionsForDistance(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
// חיפוש מחירון לפי תוספת לפי עיר
router.get('/FindPriceListByAdditionsForCities/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForCities',
        description: 'FindPriceListByAdditionsForCities in router',
    }
    try {
<<<<<<< HEAD
        logToFile(objectLog)
=======
>>>>>>> pricelist3
        const ans = await getPriceListByAdditionsForCities(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
// חיפוש מחירון לפי תוספת יום או שעה
router.get('/FindPriceListByAdditionsForTime/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForTime',
        description: 'FindPriceListByAdditionsForTime in router',
    }
    try {
<<<<<<< HEAD
        logToFile(objectLog)
=======
>>>>>>> pricelist3
        const ans = await getPriceListByAdditionsForTime(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})
//  חיפוש מחירון לפי תוספת משאית
router.get('/FindPriceListByAdditionsForTruckFill/:id', async (req, res) => {
    objectLog = {
        name: 'FindPriceListByAdditionsForTruckFill',
        description: 'FindPriceListByAdditionsForTruckFill in router',
    }
    try {
<<<<<<< HEAD
        logToFile(objectLog)

=======
>>>>>>> pricelist3
        const ans = await getPriceListByAdditionsForTruckFill(req.params.id)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})

// חיפוש ספק ואזור לפי מוצר
router.get('/FindSupplierByNameProduct/:nameTable/:nameProduct', async (req, res) => {
    objectLog = {
        name: 'FindSupplierByNameProduct',
        description: 'FindSupplierByNameProduct in router',
    }
    try {
        logToFile(objectLog)

        const ans = await getSupplierByNameProduct(req.params.nameTable, req.params.nameProduct)
        console.log(ans);
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})

router.get('/FindSupplierByNameProductBuyton/:nameTable/:nameProduct', async (req, res) => {
    objectLog = {
        name: 'FindSupplierByNameProductBuyton',
        description: 'FindSupplierByNameProductBuyton in router',
    }
    try {
        logToFile(objectLog)
        const ans = await getSupplierByNameProductBuyton(req.params.nameTable, req.params.nameProduct)
        res.status(200).send(ans)
    } catch (error) {
        objectLog.error = error.message
        logToFile(objectLog)
        res.status(500).send(error)

    }
})

<<<<<<< HEAD
module.exports = router;
=======
module.exports=router;
>>>>>>> pricelist3
