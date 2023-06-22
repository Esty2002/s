const express = require('express');
const router = express.Router();

const { getAllBranches, insertOneBranch, updateDetail, deleteBranches, checkUnique, getBranchesByCondition } = require('../../modules/suppliers/branches');

router.post('/deletebranches', express.json(), async (req, res) => {
    try {
        const response = await deleteBranches(req.body)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/getallbranches', async (req, res) => {
    try {
        const response = await getAllBranches()
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/getBranchesWithCondition/:condition/:value', async (req, res) => {

    try {
        const response = await getBranchesByCondition(req.params.condition, req.params.value)
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/insertbranch', express.json(), async (req, res) => {
    try {
        const response = await insertOneBranch(req.body)
        if (response)
            res.status(201).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.post('/updatebranch', express.json(), async (req, res) => {
    try {
        const response = await updateDetail(req.body.SupplierCode, req.body)
        if (response)
            res.status(200).send(response)
        // res.status(200).send(true);
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})


router.get('/checkUnique/:supplierCode/:branchname', async (req, res) => {
    try {
        const response = await checkUnique({ SupplierCode: req.params.supplierCode, BranchName: req.params.branchname })
        if (response)
            res.status(200).send(response)
        else {
            res.status(500).send(response)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})

module.exports = router;
