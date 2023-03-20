const express = require('express');
const router = express.Router();

const {createReceipts ,
    createCashReceiptMod ,
     createCreditReceiptMod ,
     createChequeMod ,
     createBankTransferMod,
     createStandingOrderMod,
     getReceiptNumberMod} = require('../modules/create');

router.post('/createReceipt', express.json(),async (req, res) => {
    console.log('createReceipt');
    // console.log(req.body);
    const resulte = await createReceipts(req.body)
    // res.send('hello')
})

router.post('/createCash', express.json(),async (req, res) => {
    console.log("createCash");
    // console.log(req.body);
    const resulte = await createCashReceiptMod(req.body)
    // res.send('hello')
})

router.post('/createCreditReceipt', express.json(),async (req, res) => {
    console.log("createCreditReceipt");
    // console.log(req.body);
    const resulte = await createCreditReceiptMod(req.body)
    // res.send('hello')
})

router.post('/createCheque', express.json(),async (req, res) => {
    console.log("createCheque");
    // console.log(req.body);
    const resulte = await createChequeMod(req.body)
    // res.send('hello')
})

router.post('/createBankTransfer', express.json(),async (req, res) => {
    console.log("createBankTransfer");
    // console.log(req.body);
    const resulte = await createBankTransferMod(req.body)
    // res.send('hello')
})

router.post('/createStandingOrder', express.json(),async (req, res) => {
    console.log("createStandingOrder");
    // console.log(req.body);
    const resulte = await createStandingOrderMod(req.body)
    // res.send('hello')
})

router.get('/getReceiptNumber' ,express.json(),async (req, res) => {
    const resulte = await getReceiptNumberMod()
})

module.exports = router;

