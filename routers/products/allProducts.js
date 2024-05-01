const express = require('express')
const router = express.Router()
const { getProductsListByType } = require('../../modules/products/allProducts')

router.get('/productslist/:category', async (req, res) => {
    try {
        const response = await getProductsListByType(req.params.category)
        res.status(200).send(response)
    }
    catch (error) {
        console.log({ error })
        res.status(500).send(error)
    }
})

module.exports = router