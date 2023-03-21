const express = require('express')
const router = express.Router()
const { findItem, updateProduct } = require('../modules/products')


router.get('/find', async (req, res) => {
    const name = req.query.name
    const project = { traitName: name }
    const result = await findItem(project, {
        _id: 0, traitName: 1, must: 1, ordinalNumber: 1, must: 1,
        shortTrait: 1, values: 1, addedDate: 1, enabled: 1
    })
    res.send(result)
})

router.post('/delete', express.json(), async (req, res) => {
    const ans = await updateProduct(req.body, { enabled: false, deletedDate: new Date() })
    res.status(200).send(ans)
})

module.exports = router