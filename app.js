const express = require('express')
const app = express()
const cors = require('cors')

const router_areas = require('./routers/areas-router')
const router_prices = require('./routers/prices-router')


app.use(cors())
app.use('/areas', router_areas)
app.use('/prices', router_prices)

app.get('/', (req, res) => {
    res.send('welcome')
})


module.exports = { app }