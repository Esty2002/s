const express = require('express')
const app = express()
const cors=require('cors')

const router_areas = require('./routers/areas-router')
app.use(cors())

app.use('/areas', router_areas)

app.get('/', (req, res) => {
    res.send('welcome')
})


module.exports = { app }