const router = require('express').Router()
const express = require('express')

const { addPriceList,
    createTable,
    updatePriceList,
    dletePriceList,
    selectAllAreasByPriceListCodeAndAreaNameAndItemCode,
    selectAreaByClientOrSupplyCode } = require('../../modules/sql/prices')

router.get('/', (req, res) => {
    res.send('priceList')
})

router.get('/findAllAreasByPriceListCodeAndAreaNameAndItemCode/:code/:area/:productCode', async (req, res) => {
    console.log("in router5");
    const ans = await selectAllAreasByPriceListCodeAndAreaNameAndItemCode(req.params.code, req.params.area, req.params.productCode)
    console.log('router---', ans);
    res.send(ans)
})

router.get('/findAreaByClientOrSupplyCode/:code', async (req, res) => {
    console.log("in router4");
    // const code = 100
    const code = req.params.code
    const ans = await selectAreaByClientOrSupplyCode(code)
    console.log('router--',ans);
    res.status(200).send(ans)

})
router.post('/addPriceList', express.json(), async (req, res) => {
    //צריך לקבל פה אוביקט של כל פרטי ההוספה 
    const result = await addPriceList(req.body)
    res.send(result)
})
router.post('/updatePriceList', express.json(), async (req, res) => {
    // id - מצפה לקבל אוביקט של תאריך שבו הרשומה תקפה וכן את ה 
    console.log('router--', req.body);
    console.log('router  date-', req.body.date, ' id-', req.body.id);
    const result = await updatePriceList(req.body.date, req.body.id)
    console.log('router--', result);
    res.send(result)
})

router.post('/deletePriceList', express.json(), async (req, res) => {
    // id - מצפה לקבל אוביקט שמכיל את ה 
    const result = await dletePriceList(req.body.id)
    res.send(result)
})

module.exports = router