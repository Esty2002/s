const express = require('express')
const app = express()
const cors = require('cors')
const delete_router = require('./routers/delete')
const  deleteSQL_router =require('./routers/deletePumps')
// const path = require('path')
const { MongoDBOperations } = require('./services/db/mongo/mongo-operation')
app.use(cors())

app.use('/delete', delete_router)
app.use('/deletePump',deleteSQL_router)

app.get('/', async (req, res) => {
console.log("i am in getttttttttt222222222")
    res.send("LOCALHOST:2222")
})


app.get('/*', (req, res) => {
    res.status(404).send('not found')
})

module.exports = { app }
