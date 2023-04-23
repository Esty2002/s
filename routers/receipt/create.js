const express = require('express');
const router = express.Router();

const { createReceipts,
    createCashReceiptMod,
    createCreditReceiptMod,
    createChequeMod,
    createBankTransferMod,
    createStandingOrderMod,
    getReceiptNumberMod } = require('../../modules/receipt/create');

router.post('/createReceipt', express.json(), async (req, res) => {
    _ = await createReceipts(req.body);
    res.status(200).send("success")
});

router.post('/createCash', express.json(), async (req, res) => {
    _ = await createCashReceiptMod(req.body);
    res.status(200).send("success")

});

router.post('/createCreditReceipt', express.json(), async (req, res) => {
    _ = await createCreditReceiptMod(req.body);
    res.status(200).send("success")

});

router.post('/createCheque', express.json(), async (req, res) => {
    _ = await createChequeMod(req.body);
    res.status(200).send("success")

});

router.post('/createBankTransfer', express.json(), async (req, res) => {
    _ = await createBankTransferMod(req.body);
    res.status(200).send("success")

});

router.post('/createStandingOrder', express.json(), async (req, res) => {
    _ = await createStandingOrderMod(req.body);
    res.status(200).send("success")

});

router.get('/getReceiptNumber', express.json(), async (req, res) => {
    _ = await getReceiptNumberMod();
    res.status(200).send("success")

});

module.exports = router;
