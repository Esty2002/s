const express = require('express');
const router = express.Router();
const { getReceiptByReceiptNumber, getByOption, getAll, getByPaymentType } = require('../modules/read');

router.get('/getByReceiptNumber/:id', async (req, res) => {
   let ans = await getReceiptByReceiptNumber(req.params.id);
   res.status(200).send(ans);
});

router.get(`/getOption/:column/:value`, async (req, res) => {
   const list = await getByOption('BasicDetails', req.params.column, req.params.value);
   res.status(200).send(list.recordset);
});

router.get('/getAll', async (req, res) => {
   const list = await getAll();
   res.status(200).send(list.recordset);
});

router.get('/getByPaymentType/:value', async (req, res) => {
   const list = await getByPaymentType('BasicDetails', req.params.value);
   res.status(200).send(list.recordset);
});

module.exports = router;
