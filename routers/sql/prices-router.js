const router = require('express').Router()
const express = require('express')
const { selectAreaAndPriceByItemCode, selectProductAndPricesByAreaName, selectProductByAreaName, selectAreaByClientOrSupplyCode } = require('../../modules/sql/prices')

router.get('/', async (req, res) => {
    console.log("in router");
})

router.get('/findAreaAndPriceByItemCode', async (req, res) => {
    console.log("in router1");
    const itemCode = 100//req.query
    selectAreaAndPriceByItemCode(itemCode)

})
router.get('/findProductAndPricesByAreaName', async (req, res) => {
    console.log("in router2");
    const areaName = 'ashdod'//req.query
    selectProductAndPricesByAreaName(areaName)

})

router.get('/findProductByAreaName', async (req, res) => {
    console.log("in router3");
    const areaName = 'ashdod'//req.query
    selectProductByAreaName(areaName)

})

router.get('/findAreaByClientOrSupplyCode', async (req, res) => {
    console.log("in router4");
    const code = 10//req.query
    selectAreaByClientOrSupplyCode(code)

})

module.exports = router