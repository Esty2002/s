const express = require('express');
const router = express.Router();

const { getAllBranches, insertOneBranch, updateDetail, deleteBranches, checkUnique, getBranchesByCondition } = require('../../modules/suppliers/branches');

router.post('/deletebranches', express.json(), async (req, res) => {
    try {
        const result = await deleteBranches(req.body);
        res.status(200).send(true);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.get('/getallbranches', async (req, res) => {
    try {
        const result = await getAllBranches();
            res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})
 
router.get('/getBranchesWithCondition/:condition/:value/:num', async (req, res) => {
    console.log("getBranchesWithCondition - router");
    try {
        const result = await getBranchesByCondition(req.params.condition, req.params.value ,req.params.num);
        res.status(200).send(result); 
    } 
    catch (error) {
        throw new Error("can not get branch with condition");
    }
})



router.post('/insertbranch', express.json(), async (req, res) => {
    console.log("insert brances");
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
        const result = await updateDetail(req.body.SupplierCode, req.body);
        res.status(200).send(true);
    }
    catch(error){
        res.status(500).send(error);
    }
})

// /branches/checkUnique/${branch.SupplierCode}/${branch.BranchName}
router.get('/checkUnique/:supplierCode/:branchname', async (req, res) => {
    console.log("in chckUniqe");
    try {
        const result = await checkUnique({ SupplierCode: req.params.supplierCode, BranchName: req.params.branchname });
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;
