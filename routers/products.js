const express = require('express')
const router = express.Router()
const { updateProduct, insertProduct, findProduct } = require('../modules/products')

router.post('/UpdateProduct', express.json(), async (req, res) => {
    console.log("update",req.query,req.body,"------------------------------");
    res.send( await updateProduct(req.query,req.body))
})

router.get('/getItemForSetting', async (req, res) => {  
    const product = await findProduct(req.query)
    res.send(product);
})

router.post('/addproduct', express.json(), async (req, res) => {
    const id = await insertProduct(req.body)
    console.log(id);
    res.send(id)
})

router.get('/isExsistName', async (req, res) => {
    const object = req.query
    const ans = await findProduct(object)
    res.send(ans)
})

module.exports = router