const express = require('express')
const app = express()
const cors = require('cors')
const product_router = require('./routers/product')
app.use(cors())

app.use('/product', product_router)

app.get('/', async (req, res) => {
    res.send("localhost:2222")
})

app.get('/*', (req, res) => {
    res.status(404).send('not found')
})

module.exports = { app }
