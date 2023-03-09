const express = require('express')
const app = express()

const router_areas = require('./routers/areas-router')

app.use('/areas', router_areas)

app.get('/', (req, res) => {
    res.send('welcome')
})


module.exports = { app }