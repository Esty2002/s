const express=require('express')
const router=express.Router()

const {getallbranches,insertbranch,deletebranches}=require('../modules/branches')

router.get('/getallbranches',async(req,res)=>{
    const result = await getallbranches()
    // console.log({result});
})

router.post('/insertbranch',express.json(),async(req,res)=>{
    let columns = Object.keys(req.body).join(',')
    let values = Object.values(req.body).join(',')
    const result=await insertbranch('Branches',columns,values)
    res.send(true)
})

// פונקציה ששולחת לפונקציות מחיקה במודול
router.post('/deletebranches', express.json(), async (req, res) => {
    const result = await deletebranches(req.body)
    res.status(200).send(true);

})



module.exports=router;
