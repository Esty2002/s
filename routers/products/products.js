const express = require('express')
const router = express.Router()
const { updateProduct, insertProduct, getTraits, createCartesian } = require('../../modules/products/products')


router.post('/product', express.json(), async (req, res) => {
    try { res.status(200).send(await insertProduct(req.body)) }
    catch (error) { res.status(404).send(error.message) }
})


router.post('/delete', express.json(), async (req, res) => {
    try { res.status(200).send(await updateProduct(req.body, { enabled: false, deletedDate: new Date() })) }
    catch (error) { res.status(404).send(error.message) }
})


router.post('/UpdateProduct', express.json(), async (req, res) => {
    try { res.status(200).send(await updateProduct(req.query, req.body)) }
    catch (error) { res.status(404).send(error.message) }
})


router.get('/find', async (req, res) => {
    try { res.status(200).send(await getTraits(req.query)) }
    catch (error) { res.status(404).send(error.message) }
})


router.get('/findwithsort/:by', async (req, res) => {
    try { res.status(200).send(await getTraits({}, { _id: 0 }, req.params.by)) }
    catch (error) { res.status(404).send(error.message) }
})


router.get('/alltraitmust/:must', async (req, res) => {
    try { res.status(200).send(await getTraits({ must: req.params.must == 'true' ? true : false }, { _id: 0 })) }
    catch (error) { res.status(404).send(error.message) }
})


router.get('/cartesian', async (req, res) => {
    try { res.status(200).send(await getTraits({}, { _id: 0, shortTrait: 1, "values.name": 1 })) }
    catch (error) { res.status(404).send(error.message) }
})


router.get('/search', async (req, res) => {
    try { res.status(200).send(await getTraits(Object.keys(req.query)[0] == 'ordinalNumber' ? { ordinalNumber: parseInt(req.query['ordinalNumber']) } : req.query, { _id: 0 })) }
    catch (error) { res.status(404).send(error.message) }
})





module.exports = router