const express = require('express')
const router = express.Router()

const {getAllBranches,insertOneBranch,updateDetail,deleteBranches,checkUnique,getBranchesByCondition}=require('../modules/branches')

router.get('/getallbranches',async(req,res)=>{
    const result = await getAllBranches();
    res.status(200).send(result);
})

router.get('/getBranchesWithCondition/:condition/:value', async (req, res) => {
    const result = await getBranchesByCondition(req.params.condition, req.params.value);
    res.status(200).send(result);
})

router.post('/insertbranch',express.json(),async(req,res)=>{
    try{
        const result=await insertOneBranch(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        console.log('error');
        res.status(500).send(error);
    }
})

router.post('/updatebranch', express.json(), async (req, res) => {
    try{
        const result = await updateDetail(req.body.SupplierCode,req.body)
        res.status(200).send(result)
    }
    catch(error){
        console.log('error');
        res.status(500).send(error);
    }
})

// פונקציה ששולחת לפונקציות מחיקה במודול
router.post('/deletebranches', express.json(), async (req, res) => {
    const result = await deleteBranches(req.body)
    res.status(200).send(true);
})

router.get('/checkUnique/:supplierCode/:branchname', async (req, res) => {
    try{
        const result = await checkUnique({ SupplierCode: req.params.supplierCode, BranchName: req.params.branchname })
        res.status(200).send(result)
    }
    catch(error){
        console.log('error');
        res.status(500).send(error);
    }
})


module.exports = router;
