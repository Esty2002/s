const express = require('express')
const router = express.Router()

const { getallsuppliers,insertsuppliers ,checkUnique} = require('../modules/suppliers')

router.get('/getallsuppliers', async (req, res) => {
    const result = await getallsuppliers()
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

// פונקציה ששולחת לפונקציות מחיקה במודול
router.post('/deletebranches', express.json(), async (req, res) => {
    const result = await deletebranches(req.body)
    res.status(200).send(true);
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



module.exports = router;
