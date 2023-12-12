const express = require('express')
const router = express.Router()
const { getModel } = require('../modules/utils/schemas')



router.get('/getModel/:modelName', express.json(), async (req, res) => {
    try {
        const name = await getModel(req.params.modelName)
        console.log("nameModule");
        res.status(200).send(name)
    } catch (error) {
        res.status(404).send(error)
    }

})



module.exports = router


