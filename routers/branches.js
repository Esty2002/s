const express=require('express')
const router=express.Router()

const {getallbranches}=require('../modules/branches')

router.get('/getallbranches',async(req,res)=>{
    const result = await getallbranches()
    // console.log({result});
})

module.exports=router;
