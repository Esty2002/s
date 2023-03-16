const express = require('express')
const app = express()
const { MongoDBOperations } = require('./services/db/mongo/mongo-operation')
const path = require('path')
const manageProduct = require ('./routers/products')
const cors = require('cors')

app.use(cors())

app.get('/', async (req, res) => {
    res.send('hello')  
})

app.use('/product', manageProduct)
   
app.get('/*', (req, res) => {
    res.status(404).send('not found')
})

module.exports = { app }
