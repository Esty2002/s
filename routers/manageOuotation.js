const express = require('express')
const router = express.Router();

const { Insert, Delete, Update ,commentAccordingCode,updateAccordingCode} = require('../modules/quotation/update')

router.get('/', (req, res) => {
    res.send({ message: 'welcome to router' })
})

router.get('/commentAccordingCode/:code', async (req, res) => {
    const result = await commentAccordingCode(req.params.code);
    res.send( result )
})

router.get('/updateAccordingCode/:code/:price', async (req, res) => {
    const result = await updateAccordingCode(req.params);
    res.send( result )
})

router.post('/insertQuotationItems', express.json(), async (req, res) => {
    const result = await Insert(req.body);
    res.send({ result })
})

router.post('/deleteQuotationItems', express.json(), async (req, res) => {
        const result = await Delete(req.body);        
        res.send({ result })   
})

router.post('/updateQuotationItems', express.json(), async (req, res) => {    
    const result = await Update(req.body);
    res.send({ result })
})

module.exports = router