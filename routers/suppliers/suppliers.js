const express = require('express');
const router = express.Router();

const { deleteSupplier, getAllSuppliers, insertOneSupplier, getSupplier, checkUnique, updateDetail } = require('../../modules/suppliers/suppliers');

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

router.get('/getallSuppliers', async (req, res) => {
    try {
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
