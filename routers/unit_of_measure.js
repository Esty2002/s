const express=require('express')
const router=express.Router()

const {findMeasureName,findMeasureId,insert,update} = require('../modules/measure')

router.get('/findMeasureName',async (req,res)=>{
try {
    res.status(200).send(await findMeasureName(req.query.id))
} catch (error) {
    res.status(404).send(error.message)
}
})

router.get('/findMeasureId',async (req,res)=>{
    try {
        res.status(200).send(await findMeasureId(req.query.name))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/insert',express.json(),async (req,res)=>{
    try {
        res.status(200).send(await insert(req.body))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/update',express.json(),async (req,res)=>{
    try {
        res.status(200).send(await update(req.body))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router
