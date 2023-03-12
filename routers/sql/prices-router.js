const router = require('express').Router()
const { request } = require('express')
const express = require('express')
const { addPriceList, createTable } = require('../../modules/sql/prices')

router.post('/addPriceList', express.json(), (req, res) => {
    //צריך לקבל פה אוביקט של כל פרטי ההוספה 
    const result = addPriceList(req.body)
    res.send(result)
})
router.post('/updatePriceList', express.json(), (req, res) => {
    const result = 
        res.send(result)
})