const express = require('express');
const router = express.Router();
const { updateReceipt, createReceipt, deleteReceipt } = require('../modules/update');

router.post('/update', express.json(), async (req, res) => {
    _ = updateReceipt(req.body);
    res.status(200).send(true);
})

router.post('/create', express.json(), async (req, res) => {
    _ = createReceipt(req.body);
    res.status(200).send(true);
})

router.post('/delete', express.json(), async (req, res) => {
    _ = deleteReceipt(req.body);
    res.status(200).send(true);
})

module.exports = router;
