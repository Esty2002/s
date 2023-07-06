const express = require('express')
const router = express.Router()

const { deletePriceList, reedToUpdate, updateOne, deleteItems, updateItems } = require('../../modules/pricelist/updatePricelist')

router.post('/deletePriceList', express.json(), async (req, res) => {
    const result = await deletePriceList(req.body);
    res.status(200).send(result);
})

router.post('/update', express.json(), async (req, res) => {
    const result = await reedToUpdate(req.body)
    res.status(200).send(result)
})

router.post('/updateOne', express.json(), async (req, res) => {
    const result = await updateOne(req.body)
    res.status(200).send(result)
})

router.post('/deleteItems', express.json(), async (req, res) => {
    const result = await deleteItems(req.body)
    console.log(result, " router");
    res.status(200).send(result)
})

router.post('/updateItems', express.json(), async (req, res) => {
    const result = await updateItems(req.body)
    console.log(result, " router");
    res.status(200).send(result)
})

router.post('/updateAndDeleteItems', express.json(), async (req, res) => {
    const resultUpdate = await updateItems(req.body.update)
    const resultDelete = await deleteItems(req.body.del)
    console.log(result, " router");
    res.status(200).send(result)
})

// router.get('/reedToUpdate/:tbName/:id', async (req, res) => {
//     const result = await reedToUpdate(req.params.tbName, req.params.id)
//     console.log(result ," router");
// })

module.exports = router;
