const express = require('express')
const router = express.Router()
const { getTraits } = require('../../modules/products/basicProducts')

router.post('/find', express.json(), async (req, res) => {
    try { 
        const response = await getTraits(req.body.arr, req.body.where)
        res.status(200).send(response) }
    catch (error) { res.status(500).send(error.message) }
})

module.exports = router