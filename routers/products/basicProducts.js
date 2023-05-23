const express = require('express')
const router = express.Router()
const { getTraits } = require('../../modules/products/basicProducts')

router.post('/find', express.json(), async (req, res) => {
    try { res.status(200).send(await getTraits(req.body.arr, req.body.where)) }
    catch (error) { res.status(404).send(error.message) }
})

module.exports = router