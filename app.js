const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const manageProduct = require('./routers/products/products')
const manageUnitOfMeasure = require('./routers/products/unit_of_measure')
const managePumps = require('./routers/products/pumps')

app.use(cors())
app.use('/product', manageProduct)
app.use('/unit_of_measure', manageUnitOfMeasure)
app.use('/pumps', managePumps)

app.get('/', (req, res) => {
    res.send()
})

app.get('/*', (req, res) => {
    res.status(404).send('not found')
})
module.exports = { app }

