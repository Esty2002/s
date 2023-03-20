const express = require('express')
const router = express.Router()
const { insertPumps, findPumpst, updateRecord } = require('../modules/pumps')


router.get('/find', async (req, res) => {
const a={ordinalNumber: 1, name:3, unitOfMeasure:4, pump: 4, bookkeepingCode: 6, addedDate: 8, enabled: 1, deletedDate :6}
    // const response = await insertPumps(a)
    // console.log(response);
    const atribute = 'name'
    
    console.log("iiiiii aammmmmmmmmmm");
    res.send('sssssssssss')
})
router.get('/delete',async(req,res)=>{
    let query=req.query
    console.log(query);
    const value = 3
    const result = await findPumpst(atribute, value)
    console.log(result);
})

module.exports = router