const express = require('express');
const router = express.Router();
const {deleteByReceiptNumber} = require('../modules/delete')

router.post('/:receiptNumber', async (req, res) => {
    const response = await deleteByReceiptNumber(req.params.receiptNumber)
    console.log(response);
    res.status(200).send(`client ${req.params.receiptNumber} was deleted`)
})


module.exports = router;
