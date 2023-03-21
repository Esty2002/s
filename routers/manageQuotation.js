const express = require('express');
const router = express.Router();

const { getQuotationByConditions, getQuotationItemsByQuotationCode,allContactDataList } = require('../modules/quotation/read');
const { createQuotation} = require('../modules/quotation/create');

router.get('/',express.json(), async (req, res) => {
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
    catch(error){
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
    try{
    const result = await createQuotation(req.body);
    res.send({result});
    }
    catch(error){
        res.status(500).send(error)
    }
})

module.exports = router;
