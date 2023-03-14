const express = require('express')
const router = express.Router()

const { deletesupplier, getallsuppliers,insertsuppliers } = require('../modules/suppliers')

// פונקציה ששולחת לפונקציות מחיקה במודול
router.post('/deletesupplier', express.json(), async (req, res) => {
    const result = await deletesupplier(req.body)
    res.status(200).send(true);

})


router.get('/getallsuppliers', async (req, res) => {
    const result = await getallsuppliers()
})
router.post('/insertsuppliers',express.json(), async (req, res) => {
    const result = await insertsuppliers(req.body)
})



module.exports = router;
