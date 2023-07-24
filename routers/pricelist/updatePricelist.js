const express = require('express');
const router = express.Router()

const { deletePriceList, reedToUpdate, updateOne, deleteItems, updateItems, read } = require('../../modules/pricelist/updatePricelist')

router.put('/deletePriceList', express.json(), async (req, res) => {
    try {
        const result = await deletePriceList(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
})

// router.post('/update', express.json(), async (req, res) => {
//     const result = await reedToUpdate(req.body)
//     res.status(200).send(result)
// })

router.put('/updateOne', express.json(), async (req, res) => {
    try {
        const result = await updateOne(req.body)
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.post('/deleteItems', express.json(), async (req, res) => {
    try {
        const result = await deleteItems(req.body)
        console.log(result, " router");
        res.status(200).send(result)
    }
    catch (error) {
        res.status(500).send(error);
    }
})

router.post('/updateItems', express.json(), async (req, res) => {
    try {
        const result = await updateItems(req.body)
        console.log(result, " router");
        res.status(200).send(result)
    }
    catch (error) {
        console.log({ error });
        res.status(500).send(error);
    }
})

// router.post('/updateAndDeleteItems', express.json(), async (req, res) => {
//     const resultUpdate = await updateItems(req.body.update)
//     const resultDelete = await deleteItems(req.body.del)
//     console.log(result, " router");
//     res.status(200).send(result)
// })

// router.get('/read', express.json(), async (req, res) => {
// console.log(req.body,"eeeeeeeeeerrrrrrrr");
//     const resultDelete = await read(req.body)
//     res.status(200).send(resultDelete)
// })

// router.get('/reedToUpdate/:tbName/:id', async (req, res) => {
//     const result = await reedToUpdate(req.params.tbName, req.params.id)
//     console.log(result ," router");
// })

module.exports = router;
