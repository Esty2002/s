const express = require('express');
const router = express.Router();

const { Start1, Start2, Delete } = require('../modules/quotation/delete')


router.get('/', (req, res) => {
    res.send({ message: 'Welcome to router' })
})


// פונקציה למחיקה
router.post('/deleteQuotationItems', express.json(), async (req, res) => {
    try {
        const result = await Delete(req.body)
        res.status(200).send({ result })
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
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