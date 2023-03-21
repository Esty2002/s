const express = require('express');
const router = express.Router();

const { DeleteQuat } = require('../modules/quotation/delete')


router.get('/', (req, res) => {
    res.send({ message: 'Welcome to router' })
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