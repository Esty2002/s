const express = require('express').Router()
const { updateProduct, insertProduct, findObject } = require('../modules/products')
const { getTraits } = require('../modules/read')


router.post('/addproduct', express.json(), async (req, res) => {
    console.log("req.body", req.body);
    const id = await insertProduct(req.body)
    console.log(id);
    res.send(id)
})
router.get('/find', async (req, res) => {
    const object = req.query
    const ans = await findObject(object)
    res.send(ans)
})
router.get('/getItemForSetting', async (req, res) => {
    const product = await updateProduct(req.query.name)
    console.log(product, "pro");
    res.send(product);
})
router.get('/findwithsort/:by', async (req, res) => {
    res.send(await getTraits({}, { _id: 0 }, req.params.by))
})
router.get('/alltraitmust/:must', async (req, res) => {
    res.send(await getTraits({ must: req.params.must == 'true' ? true : false }, { _id: 0 }))
})
router.get('/cartesian', async (req, res) => {
    res.send(await getTraits({}, { _id: 0, shortTrait: 1, "values.name": 1 }))
})
router.get('/search', async (req, res) => {
    res.send(await getTraits(Object.keys(req.query)[0] == 'ordinalNumber' ? { ordinalNumber: parseInt(req.query['ordinalNumber']) } : req.query, { _id: 0 }))
})


module.exports = router