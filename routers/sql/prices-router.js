const router = require('express').Router()
const express = require('express')
const { selectAreaAndPriceByItemCode, selectProductAndPricesByAreaName, selectProductByAreaName, selectAreaByClientOrSupplyCode, selectAllAreas } = require('../../modules/sql/prices')

router.get('/', async (req, res) => {
    console.log("in router");
})

router.get('/findAreaAndPriceByItemCode/:code', async (req, res) => {
    console.log("in router1");
    // const itemCode = 1//req.query
    const itemCode = req.params.code
    console.log("item" + itemCode);
    const ans = await selectAreaAndPriceByItemCode(itemCode)
    res.send(ans)

})
router.get('/findProductAndPricesByAreaName/:itemCode', async (req, res) => {
    console.log("in router2");
    const areaName = req.params.itemCode
    //  const areaName = req.query.areaName
    const ans = await selectProductAndPricesByAreaName(areaName)
    res.send(ans)

})

router.get('/findProductByAreaName', async (req, res) => {
    console.log("in router3");
    const areaName = 'ashdod'//req.query
    const ans=selectProductByAreaName(areaName)
    res.send(ans)

})

router.get('/findAreaByClientOrSupplyCode', async (req, res) => {
    console.log("in router4");
    const code = 100//req.query
    const ans=selectAreaByClientOrSupplyCode(code)
    res.send(ans)

})

router.get('/findAllAreas', async (req, res) => {
    console.log("in router5");
    const ans=selectAllAreas()
    res.send(ans)
})

module.exports = router