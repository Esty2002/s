const express = require('express')
const router = express.Router()

const { deleteSupplier, getAllSuppliers, insertOneSupplier, getSupplier, checkUnique ,updateDetail} = require('../modules/suppliers')

//sent to modules to delet supplier 
router.post('/deletesupplier', express.json(), async (req, res) => {
    try {
        const result = await deleteSupplier(req.body);
        res.status(200).send(true);
    }
    catch (error) {
        console.log('error');
        res.status(500).send(error);
    }
})

router.get('/getSupplierWithCondition/:condition/:value', async (req, res) => {
    const result = await getSupplierByCondition(req.params.condition, req.params.value);
    res.status(200).send(result);
})

router.post('/insertsupplier', express.json(), async (req, res) => {
    try {
        const result = await insertOneSupplier(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})


router.post('/updatesupplier', express.json(), async (req, res) => {
    try{
        const result = await updateDetail(req.body.OldSupplierCode,req.body)
        res.status(200).send(result)
    }
    catch(error){
        console.log('error');
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
//פונקציה שמביא את כל נתוני הספקים
router.get('/getallSuppliers', async (req, res) => {
    try {
        const result = await getAllSuppliers();
        res.send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})
//פונקציה שמביא ספק לפי תור ונתון
router.get('/getSuppliers/:option/:text', async (req, res) => {
    try {
        const result = await getSupplier({ option: req.params.option, text: req.params.text })
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send(error);
    }

})

module.exports = router;
