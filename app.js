const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const { MongoDBOperations } = require('./services/db/mongo/mongo-operation')
const manageProduct = require('./routers/products')
// const readRouter = require('./routers/read')

app.use(cors())
app.use('/product', manageProduct)
// app.use('/read', readRouter)

app.get('/', (req, res) => {
    res.send()
})
app.get('/a', async (req, res) => {
    const q = new MongoDBOperations()
    const ans = await q.insertOne({ traitName: "ewq" })
    const an = await q.insertOne({ shortTrait: "iop" })
    console.log(ans, an);
    res.send()
})
app.get('/b', async (req, res) => {
    console.log("daaaaaaaaaaaaaaai");
    res.send()
})

app.use('/product', manageProduct)

app.get('/*', (req, res) => {
    res.status(404).send('not found')
})
module.exports = { app }

