const express = require('express')
const router = express.Router()
const { addAllClient } = require('../modules/createClient')

router.post('/add', express.json(), async (req, res) => {
    console.log(req.body);
    console.log(' body');
    const result = await addAllClient(req.body);
    if (result == false)
        res.status(200).send(false)
    else
        res.status(200).send(true);
})

// router.post('/add',express.urlencoded({extended:true}),async(req,res)=>{
//     console.log(req.body+' body');
//     await addAllClient(req.body);
//     res.send(true);
// })

// router.post('/add',async(req,res)=>{
//     await addAllClient();
//     res.send(true);
// })

module.exports = router

