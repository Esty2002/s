const express = require('express');
const router = express.Router();

const { deleteSupplier, getAllSuppliers, insertOneSupplier, getSupplier, checkUnique, updateDetail } = require('../modules/suppliers');

//sent to modules to delet supplier 
router.post('/deletesupplier', express.json(), async (req, res) => {
    try {
        const result = await deleteSupplier(req.body);
        res.status(200).send(true);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.post('/insertsupplier', express.json(), async (req, res) => {
    try {
        const result = await insertOneSupplier(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.post('/updatesupplier', express.json(), async (req, res) => {
    try {
        const result = await updateDetail(req.body.OldSupplierCode, req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.get('/checkUnique/:suppliercode/:suppliername', async (req, res) => {
    try {
        const result = await checkUnique({ SupplierCode: req.params.suppliercode,SupplierName: req.params.suppliername});
        res.status(200).send(result); 
    } 
    catch (error) {
        res.status(500).send(error);
    }
})
//פונקציה שמביא את כל נתוני הספקים
router.get('/getallSuppliers', async (req, res) => {
    try {
        const result = await getAllSuppliers();
        if (result.length > 0) {
            res.status(200).send(result);
        }
        else {
            res.status(404).send([]);
        }
    } 
    catch (error) {
        res.status(500).send(error);
    }

})
//פונקציה שמביא ספק לפי תור ונתון
router.get('/getSuppliers/:option/:text', async (req, res) => {
    try {
        const result = await getSupplier({ option: req.params.option, text: req.params.text });
        if (Object.keys(result)>0) {
            res.status(200).send(result);
        }
        else {
            res.status(404).send([]);
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
