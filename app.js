
const express = require('express')
const app = express()
const router_prices = require('./routers/sql/prices-router')

app.use('/prices', router_prices)

app.get('/', (req, res) => {
    res.send('welcome')
})

module.exports = { app };


