const express = require('express');
const router = express.Router()

const { deletePriceList, updateOne, deleteItems, updateItems } = require('../../modules/pricelist/updatePricelist')

router.put('/deletePriceList', express.json(), async (req, res) => {
    try {
        const result = await deletePriceList(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.put('/updateOne', express.json(), async (req, res) => {
    try {
        const result = await updateOne(req.body)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.get('/deleteItems', express.json(), async (req, res) => {
    try {
        const result = await deleteItems(req.body)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.post('/updateItems', express.json(), async (req, res) => {
    try {
        const result = await updateItems(req.body)
        res.status(200).send(result)
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error);
    }
})


module.exports = router;
