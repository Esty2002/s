const express = require('express');
const router = express.Router();

const {getByOption,getAll,getByPaymentType} =require('../modules/read')


router.get(`/getOption/:column/:value`,async(req,res)=>{
   // console.log('esti yuti');
   console.log(req.params.value);
   const list= await getByOption('BasicDetails',req.params.column,req.params.value)
   // console.log(list+"jhdfgu");
   res.status(200).send(list.recordset)
}),

router.get('/getAll',async(req,res)=>{

   const list= await getAll()
   console.log(list+"jhdfgu");
   res.status(200).send(list.recordset)
})

router.get('/getByPaymentType/:value',async(req,res)=>{
   console.log(req.params);
   const list= await getByPaymentType('BasicDetails',req.params.value)
   console.log(list, "  getByPaymentType");
   res.status(200).send(list.recordset)
})
module.exports = router;
