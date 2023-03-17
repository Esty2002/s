const express = require('express')
const router = express.Router()

const { deleteSupplier, getAllSuppliers,insertOneSupplier, getSupplier,checkUnique} = require('../modules/suppliers')

// פונקציה ששולחת לפונקציות מחיקה ספק במודול
router.post('/deletesupplier', express.json(), async (req, res) => {
    const result = await deleteSupplier(req.body);
    res.status(200).send(true);
})

router.post('/insertsupplier',express.json(), async (req, res) => {
    try{
        const result = await insertOneSupplier(req.body);
        res.status(200).send(result);
    }
    catch(error){
        res.status(500).send(error);
    }
})

router.get('/checkUnique/:suppliercode/:suppliername',async(req,res)=>{
    const data={
        SupplierCode:req.params.suppliercode,
        SupplierName:req.params.suppliername
    }
    const result = await checkUnique(data)
    res.status(200).send(result)
})

router.get('/getallSuppliers', async (req, res) => {
    const result = await getAllSuppliers()
    res.send(result)
})

router.get('/getSuppliers/:option/:text', async (req, res) => {
    console.log(req.params.option);
    console.log(req.params.text);
    const result = await getSupplier({option:req.params.option,text:req.params.text})
    console.log({ result });
    res.status(200).send(result)
})

module.exports = router;
