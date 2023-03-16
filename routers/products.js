const express = require('express')
// const path=require('path')
const router = express.Router()
const { updateProduct, insertProduct, findObject } = require('../modules/products')


router.post('/addproduct', express.json(), async (req, res) => {
    console.log("req.body", req.body);
    const id = await insertProduct(req.body)
    console.log(id);
    res.send(id)
})
router.get('/isexistname', async (req, res) => {
    const object = req.query
    // const traitName = req.query.traitName
    // const project = req.query.project
    // console.log("object2", object, project, traitName)
    const ans = await findObject(object)
    // let object = {}
    // object[type] = temp
    res.send(ans)
})
router.get('/getItemForSetting', async (req, res) => {
    const product = await updateProduct(req.query.name)
    console.log(product, "pro");
    res.send(product);
})
module.exports = router