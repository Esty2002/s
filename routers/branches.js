const express=require('express')
const router=express.Router()

const {getallbranches,insertbranch,updateDetail}=require('../modules/branches')

router.get('/getallbranches',async(req,res)=>{
    const result = await getallbranches()
    console.log({result});
})

router.post('/insertbranch',express.json(),async(req,res)=>{
    try{
        const result=await insertbranch(req.body)
        res.status(200).send(result);
    }
    catch(error){
        console.log(error);
        res.status(500).send(error);
    }
})

router.post('/updatebranch',express.json(),async(req,res)=>{
    console.log(req.body);
    const result = await updateDetail(1111,req.body);
    res.status(200).send(result)
})

module.exports=router;
