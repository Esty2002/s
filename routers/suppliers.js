const express = require('express')
const router = express.Router()

const { getallSuppliers, insertSuplier, getSupplier } = require('../modules/suppliers')

router.get('/getallSuppliers', async (req, res) => {
    console.log('res');
    const result = await getallSuppliers()
    console.log({ result });
    res.send(result)
})
router.get('/getSuppliers/:option/:text', async (req, res) => {
    console.log('jhvcxdfv');
    console.log(req.params.option, 'req.boffffffffffffffffffffdy');
    const result = await getSupplier({option:req.params.option,text:req.params.text})
    console.log({ result });
    res.send(result)
})
router.post('/insertSupplier', express.json(), async (req, res) => {
    let columns = Object.keys(req.body).join(',')
    let values = Object.values(req.body).join(',')
    const result = await insertSuplier('suppliers', columns, values)
    res.send(true)
})

module.exports = router;
