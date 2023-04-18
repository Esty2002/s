const express = require('express');
const router = express.Router();

const { getQuotationByConditions, getQuotationItemsByQuotationCode, allContactDataList } = require('../modules/quotation/read');
const { createQuotation } = require('../modules/quotation/create');
const { Insert, Delete, Update, commentAccordingCode, updateAccordingCode } = require('../modules/quotation/update')
const { DeleteQuat } = require('../modules/quotation/delete')


router.get('/', express.json(), async (req, res) => {
    res.send("wellcome quotation");
})

//בקשת טבלת הצעת מחיר מבסיס הנתונים לפי תנאים מסוימים
router.post('/getQuotationsByConditions', express.json(), async (req, res) => {
    try {
        const result = await getQuotationByConditions(req.body);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

//בקשת טבלת פריטי תמחור מבסיס הנתונים לפי קוד הצעת מחיר 
router.get('/getQuotationItemsByQuotationCode/:quotationCode', async (req, res) => {
    try {
        const result = await getQuotationItemsByQuotationCode(req.params.quotationCode);
        res.status(200).send(result);
    }
    catch (error) {
        res.status(404).send(error);
    }
});

router.get('/allContactList', async (req, res) => {

    try {
        const result = await allContactDataList();
        res.send(result)
    } catch (error) {
        res.send(error)
    }

})


router.post('/create', express.json(), async (req, res) => {
    try {
        const result = await createQuotation(req.body);
        res.send({ result });
    }
    catch (error) {

    }
})


router.get('/commentAccordingCode/:code', async (req, res) => {
    const result = await commentAccordingCode(req.params.code);
    res.send(result)
})

router.get('/updateAccordingCode/:code/:price', async (req, res) => {
    const result = await updateAccordingCode(req.params);
    res.send(result)
})

router.post('/insertQuotationItems', express.json(), async (req, res) => {
    const result = await Insert(req.body);
    res.send({ result })
})

router.post('/deleteQuotationItems', express.json(), async (req, res) => {
    const result = await Delete(req.body);
    res.send({ result })
})

router.post('/updateQuotationItems', express.json(), async (req, res) => {
    const result = await Update(req.body);
    res.send({ result })
})


// פונקציה למחיקת הצעת מחיר
router.post('/deleteQuotation', express.json(), async (req, res) => {
    try {
        const result = await DeleteQuat(req.body)
        res.status(200).send({ result })
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})



module.exports = router