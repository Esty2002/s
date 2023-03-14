const express = require('express')
const router = express.Router()

const { getallsuppliers,insertsuppliers } = require('../modules/suppliers')

router.get('/getallsuppliers', async (req, res) => {
    const result = await getallsuppliers()
})
router.post('/insertsuppliers',express.json(), async (req, res) => {
    const result = await insertsuppliers(req.body)
})



module.exports = router;
