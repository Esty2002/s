const express = require('express')
const router = express.Router()
const { findFinishProduct, insertFinishProduct, updateFinishProduct } = require('../../modules/products/finishProducts')

router.post('/create', express.json(), async (req, res) => {
    console.log(req.body);
    try { res.status(200).send(await insertFinishProduct(req.body)) }
    catch (error) { res.status(404).send(error.message) }
})

router.post('/update', express.json(), async (req, res) => {
    try { res.status(200).send(await updateFinishProduct(req.body.update, req.body.where)) }
    catch (error) { res.status(404).send(error.message) }
})

router.post('/delete', express.json(), async (req, res) => {
    try { res.status(200).send(await updateFinishProduct({ enabled: false, deletedDate: new Date() }, req.body)) }
    catch (error) { res.status(404).send(error.message) }
})

router.post('/find',express.json(), async (req, res) => {
    try { res.status(200).send(await findFinishProduct(req.body.arr, req.body.where)) }
    catch (error) { res.status(404).send(error.message) }
})

module.exports = router