const express = require('express')
const router = express.Router()
const { updateProduct, insertProduct, findProduct, getTraits,createCartesian } = require('../modules/products')

router.post('/UpdateProduct', express.json(), async (req, res) => {
    console.log("update", req.query, req.body, "------------------------------");
    res.send(await updateProduct(req.query, req.body))
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
router.get('/find', async (req, res) => {
    // const object = req.query
    console.log("req.query",req.query);
    const ans = await findProduct(req.query)
    console.log(ans);
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
router.post('/delete', express.json(), async (req, res) => {
    const ans = await updateProduct(req.body, { enabled: false, deletedDate: new Date() })
    res.status(200).send(ans)
})

router.get('/cartesian', async (req, res) => {
    res.status(200).send(await createCartesian(req.query.start))
})

module.exports = router