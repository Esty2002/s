const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { MongoDBOperations } = require('./services/db/mongo/mongo-operation')
const manageProduct = require('./routers/products')
const manageUnitOfMeasure=require('./routers/unit_of_measure')

app.use(cors())
app.use('/product', manageProduct)
app.use('/unit_of_measure',manageUnitOfMeasure)

app.get('/', (req, res) => {
    res.send()
})

app.get('/*', (req, res) => {
    res.status(404).send('not found')
})
module.exports = { app }

