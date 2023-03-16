const express = require('express')
const router = express.Router()

const { deletesupplier, getallSuppliers,insertsuppliers, getSupplier,checkUnique} = require('../modules/suppliers')

// פונקציה ששולחת לפונקציות מחיקה ספק במודול
router.post('/deletesupplier', express.json(), async (req, res) => {
    const result = await deletesupplier(req.body)
    res.status(200).send(true);
})

router.post('/insertsuppliers',express.json(), async (req, res) => {
    try{
        const result = await insertsuppliers(req.body)
        res.status(200).send(result);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

router.get('/checkUnique/:suppliercode/:suppliername',async(req,res)=>{
    const result = await checkUnique({ SupplierName:req.params.suppliername})
    res.status(200).send(result)
})

router.get('/getallSuppliers', async (req, res) => {
    const result = await getallSuppliers()
    res.send(result)
})

router.get('/getSuppliers/:option/:text', async (req, res) => {
    const result = await getSupplier({option:req.params.option,text:req.params.text})
    res.status(200).send(result)
})

module.exports = router;
