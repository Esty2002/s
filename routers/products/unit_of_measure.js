const express=require('express')
const router=express.Router()

const {findMeasureName,findMeasureNumber,insertMeasure,updateMeasure} = require('../../modules/products/measure')

router.get('/findMeasureName',async (req,res)=>{
try {
    res.status(200).send(await findMeasureName(req.query.id))
} catch (error) {
    res.status(404).send(error.message)
}
})

router.get('/findMeasureId',async (req,res)=>{
    try {
        res.status(200).send(await findMeasureNumber(req.query.name))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/insert',express.json(),async (req,res)=>{
    try {
        res.status(200).send(await insertMeasure(req.body.new))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/update',express.json(),async (req,res)=>{
    try {
        res.status(200).send(await updateMeasure(req.body.prev,req.body.new))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router