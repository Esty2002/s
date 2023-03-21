const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { MongoDBOperations } = require('./services/db/mongo/mongo-operation')
const manageProduct = require('./routers/products')

app.use(cors())
app.use('/product', manageProduct)

app.get('/', (req, res) => {
    res.send()
})

app.get('/*', (req, res) => {
    res.status(404).send('not found')
})
module.exports = { app }

