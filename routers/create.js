const express = require('express');
const router = express.Router();

const { createReceipts,
    createCashReceiptMod,
    createCreditReceiptMod,
    createChequeMod,
    createBankTransferMod,
    createStandingOrderMod,
    getReceiptNumberMod } = require('../modules/create');

router.post('/createReceipt', express.json(), async (req, res) => {
    _ = await createReceipts(req.body);
});

router.post('/createCash', express.json(), async (req, res) => {
    _ = await createCashReceiptMod(req.body);
});

router.post('/createCreditReceipt', express.json(), async (req, res) => {
    _ = await createCreditReceiptMod(req.body);
});

router.post('/createCheque', express.json(), async (req, res) => {
    _ = await createChequeMod(req.body);
});

router.post('/createBankTransfer', express.json(), async (req, res) => {
    _ = await createBankTransferMod(req.body);
});

router.post('/createStandingOrder', express.json(), async (req, res) => {
    _ = await createStandingOrderMod(req.body);
});

router.get('/getReceiptNumber', express.json(), async (req, res) => {
    _ = await getReceiptNumberMod();
});

module.exports = router;
