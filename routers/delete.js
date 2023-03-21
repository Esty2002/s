const express = require('express');
const router = express.Router();
const { deleteByReceiptNumber } = require('../modules/delete');

router.post('/:receiptNumber', async (req, res) => {
    _ = await deleteByReceiptNumber(req.params.receiptNumber);
    res.status(200).send(`recepit ${req.params.receiptNumber} was deleted`);
});

module.exports = router;
