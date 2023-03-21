const express = require('express')
const router = express.Router()

const { getAllBranches, insertOneBranch, updateDetail, deleteBranches, checkUnique, getBranchesByCondition } = require('../modules/branches')


//sent to modules to delet branch 
router.post('/deletebranches', express.json(), async (req, res) => {
    try {
        const result = await deleteBranches(req.body)
        res.status(200).send(true);
    }
    catch (error) {
        console.log('error');
        res.status(500).send(error);
    }
})

router.get('/getallbranches', async (req, res) => {
    const result = await getAllBranches();
    if (result.length > 0) {
        res.status(200).send(result);
    }
    else {
        res.status(404).send([])
    }
})

router.get('/getBranchesWithCondition/:condition/:value', async (req, res) => {
    const result = await getBranchesByCondition(req.params.condition, req.params.value);
    res.status(200).send(result);
})

router.post('/insertbranch', express.json(), async (req, res) => {
    console.log(req.body);
    try {
        const result = await insertOneBranch(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.post('/updatebranch', express.json(), async (req, res) => {
    try {
        const result = await updateDetail(req.body.SupplierCode, req.body)
        res.status(200).send(result)
    }
    catch (error) {
        console.log('error');
        res.status(500).send(error);
    }
})


router.get('/checkUnique/:supplierCode/:branchname', async (req, res) => {
    try {
        const result = await checkUnique({ SupplierCode: req.params.supplierCode, BranchName: req.params.branchname })
        res.status(200).send(result)
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = router;
