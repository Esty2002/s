const express = require('express')
const router = express.Router()

const { deletesupplier, getallSuppliers,insertsuppliers, getSupplier,checkUnique} = require('../modules/suppliers')

// פונקציה ששולחת לפונקציות מחיקה במודול
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

router.post('/insertsupplierandbranch',express.json(), async (req, res) => {
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
    const data={
        SupplierCode:req.params.suppliercode,
        SupplierName:req.params.suppliername
    }
    const result = await checkUnique(data)
    console.log(result);
    res.status(200).send(result)
})

router.get('/getallSuppliers', async (req, res) => {
    console.log('res');
    const result = await getallSuppliers()
    res.send(result)
})

router.get('/getSuppliers/:option/:text', async (req, res) => {
    const result = await getSupplier({option:req.params.option,text:req.params.text})
    console.log({ result });
    res.send(result)
})


module.exports = router;
