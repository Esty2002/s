const express = require('express');
const router = express.Router();

const { Start1, Start2, Delete } = require('../modules/quotation/sql/delete')


router.get('/', (req, res) => {
    res.send({ message: 'Welcome to router' })
})


// פונקציה למחיקה
router.post('/deleteQuotationItems', express.json(), async (req, res) => {
    const result = await Delete(req.body)
    res.send({ result })
})

router.post('/begin1', express.json(), async (req, res) => {
    const result = await Start1();
    res.send({ result })
})

router.post('/begin2', express.json(), async (req, res) => {
    const result = await Start2();
    res.send({ result })
})


module.exports = router