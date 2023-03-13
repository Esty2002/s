const express = require('express')
const router = express.Router()

const { getallsuppliers,insertsuppliers } = require('../modules/suppliers')

router.get('/UpdateSupplier', async (req, res) => {
    const result = await getallsuppliers()
    // console.log({ result });
})



module.exports = router;
