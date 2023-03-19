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
    res.status(200).send(result);
})

router.get('/getBranchesWithCondition/:condition/:value', async (req, res) => {
    const result = await getBranchesByCondition(req.params.condition, req.params.value);
    res.status(200).send(result);
})

router.post('/insertbranch', express.json(), async (req, res) => {
    try {
        const result = await insertOneBranch(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

router.post('/updatebranch', express.json(), async (req, res) => {
    console.log(req.body);
    const result = await updateDetail(1111, req.body);
    res.status(200).send(result)
})



router.get('/checkUnique/:suppliercode/:branchname', async (req, res) => {
    const data = {
        SupplierCode: req.params.suppliercode,
        BranchName: req.params.branchname
    }
    const result = await checkUnique(data)
    console.log(result);
    res.status(200).send(result)
})

module.exports = router;
