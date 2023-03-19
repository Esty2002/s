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
    const result = await checkUnique({ SupplierName:req.params.suppliername})
    res.status(200).send(result)
})
//פונקציה שמביא את כל נתוני הספקים
router.get('/getallSuppliers', async (req, res) => {
    const result = await getAllSuppliers()
    res.send(result)
})
//פונקציה שמביא ספק לפי תור ונתון
router.get('/getSuppliers/:option/:text', async (req, res) => {
    const result = await getSupplier({option:req.params.option,text:req.params.text})
    res.status(200).send(result)
})

module.exports = router;
