const express = require('express')
const router = express.Router()
const { getCementTraits } = require('../../modules/products/basicProducts')

router.get('/allcombination',  async (req, res) => {
    try {
        const response =await getCementTraits()
        if (response.status == 200)
            res.status(200).send(response.data)
        else {
            res.status(response.status).send(response.data)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports = router