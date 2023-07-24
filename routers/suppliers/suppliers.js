const express = require('express');
const router = express.Router();

const { deleteSupplier, getAllSuppliers, insertOneSupplier, getSupplier, checkUnique, updateDetail, checkUniqueCode, checkUniqueName, countRowes } = require('../../modules/suppliers/suppliers');

router.post('/deletesupplier', express.json(), async (req, res) => {
    try {
        const response = await deleteSupplier(req.body);
        if (response.status === 200)
            res.status(200).send(response.data);
        // res.status(200).send(true);
        else {
            res.status(500).send(response.data);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/insertsupplier', express.json(), async (req, res) => {
    console.log("suppliers - router", req.body);
    try {
        const response = await insertOneSupplier(req.body);
        if (response)
            res.status(201).send(response.data);
        else {
            res.status(500).send(response.data);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/updatesupplier', express.json(), async (req, res) => {
    try {
        const response = await updateDetail(req.body);
        if (response)
            res.status(response.status).send(response.data);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/checkUnique/:suppliercode/:suppliername', async (req, res) => {
    try {
        const response = await checkUnique({ SupplierCode: req.params.suppliercode, SupplierName: req.params.suppliername });
        if (response)
            res.status(200).send(response);
        else {
            res.status(500).send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/checkUniqueCode/:suppliercode', async (req, res) => {
    try {
        const response = checkUniqueCode({ SupplierCode: req.params.suppliercode });
        if (response)
            res.status(200).send(response);
        else {
            res.status(500).send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/checkUniqueName/:suppliername', async (req, res) => {
    try {
        const response = await checkUniqueName({ SupplierName: req.params.suppliername });
        if (response)
            res.status(200).send(response);
        else {
            res.status(500).send(response);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/getallSuppliers', async (req, res) => {
    try {
        console.log(req.query);
        const response = await getAllSuppliers(req.query);
        if (response)
            res.status(200).send(response.data);
        else {
            res.status(500).send(response.data);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/getSuppliers', async (req, res) => {
    try {
        const response = await getSupplier(req.query);
        if (response)
            res.status(200).send(response.data);
        else {
            res.status(500).send(response.data);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/insertCountBranches/:supplierCode/:isDisable', async (req, res) => {
    try {
        const result = await countRowes(req.params.supplierCode, req.params.isDisable);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
