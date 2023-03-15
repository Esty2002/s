const express = require('express')
const app = express()

const router_areas = require('./routers/areas-router')
const cors = require('cors')


app.use(cors())


app.get('/', (req, res) => {
    res.send('welcome')
})


app.use('/areas', router_areas)



module.exports = { app }