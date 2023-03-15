const router = require('express').Router()
const express = require('express')

const { insertArea, findSupplierOrClient ,findAreaByCode} = require('../modules/areas')
// router.get('/', async (req, res) => {
//     const result = await insertArea({'phone':req.body})
//     res.send(result)
// })

// router.get('/isExist', async (req, res) => {
//     const { phone } = req.body
//     const result = await findSupplierOrClient(phone)
//     res.status(200).send(result)
// })

// /:code
router.get('/findAreasByCode',async(req,res)=>{
    console.log("in router");
    const code=1234
    // const code=req.params.code
    const result =await findAreaByCode(code)
    res.send(result)
})

module.exports = router