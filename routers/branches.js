const express=require('express')
const router=express.Router()

const {getallbranches,insertbranch}=require('../modules/branches')

router.get('/getallbranches',async(req,res)=>{
    const result = await getallbranches()
    console.log({result});
})

router.post('/insertbranch',express.json(),async(req,res)=>{
    let columns = Object.keys(req.body).join(',')
    let values = Object.values(req.body).join(',')
    const result=await insertbranch('Branches',columns,values)
    res.send(true)
})

module.exports=router;
