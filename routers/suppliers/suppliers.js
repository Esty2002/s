const express = require('express');
const router = express.Router();

const { deleteSupplier, getAllSuppliers, insertOneSupplier, getSupplier, checkUnique, updateDetail ,checkUniqueCode,checkUniqueName} = require('../../modules/suppliers/suppliers');

router.post('/deletesupplier', express.json(), async (req, res) => {
    try {
        // console.log("req.bodydhsjfkhiudyfs1111111111",req.body);
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
    console.log("checkUnique - router");
    // try {
        const result = await checkUnique({ SupplierCode: req.params.suppliercode,SupplierName: req.params.suppliername});
        res.status(200).send(result); 
    // } 
    // catch (error) {
        // res.status(500).send(error);
    // }
})

router.get('/checkUniqueCode/:suppliercode', async (req, res) => {
    try {
        const result = await checkUniqueCode({ SupplierCode: req.params.suppliercode});
        res.status(200).send(result); 
    } 
    catch (error) {
        res.status(500).send(error);
    }
})

router.get('/checkUniqueName/:suppliername', async (req, res) => {
    try {
        const result = await checkUniqueNamec({ SupplierName: req.params.suppliername});
        res.status(200).send(result); 
    } 
    catch (error) {
        res.status(500).send(error);
    }
})

router.get('/getallSuppliers', async (req, res) => {
    try {
        console.log("getallSuppliers - router");

        const result = await getAllSuppliers();
            res.status(200).send(result);
    } 
    catch (error) {
        res.status(500).send(error);
    }

})

router.get('/getSuppliers/:option/:text', async (req, res) => {
    try {
        const result = await getSupplier({ option: req.params.option, text: req.params.text });
            res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
