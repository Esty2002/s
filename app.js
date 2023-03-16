const express = require('express')

const cors= require('cors');



const app = express()

const router_areas = require('./routers/db/areas-router')
const router_prices = require('./routers/sql/prices-router')
app.use(cors())
app.use('/areas', router_areas)
app.use('/prices', router_prices)

app.get('/', (req, res) => {
    res.send('welcome')
})


module.exports = { app }