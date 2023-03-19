const router = require('express').Router()

const { getTraits } = require('../modules/read')

router.get('/find', async (req, res) => {
    res.send(await getTraits(Object.keys(req.query)[0] == 'ordinalNumber' ? { ordinalNumber: parseInt(req.query['ordinalNumber']) } : req.query, { _id: 0 }))
})

router.get('/findwithsort/:by', async (req, res) => {
    res.send(await getTraits({}, { _id: 0 }, req.params.by))
})

router.get('/alltraitmust/:must', async (req, res) => {
    res.send(await getTraits({ must: req.params.must == 'true' ? true : false }, { _id: 0 }))
})

router.get('/cartesian', async (req, res) => {
    res.send(await getTraits({},{_id:0,shortTrait:1,"values.name":1}))
})

module.exports = router
