const express = require('express');
const router = express.Router();
const { getReceiptByReceiptNumber } = require('../modules/read');

router.get('/getByReceiptNumber/:id', async (req, res) => {
    console.log('/getByReceiptNumber');
    let ans = await getReceiptByReceiptNumber(req.params.id);
    res.status(200).send(ans);
})

module.exports = router;
