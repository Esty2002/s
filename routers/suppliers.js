const express = require('express')
const router = express.Router()

const { deletesupplier } = require('../modules/suppliers')

// פונקציה ששולחת לפונקציות מחיקה במודול
router.post('/deletesupplier', express.json(), async (req, res) => {
    const result = await deletesupplier(req.body)
    res.status(200).send(true);

})

module.exports = router;
