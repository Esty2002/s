const express = require('express')
const app = express()
const cors = require('cors')
const delete_router = require('./routers/delete')
app.use(cors())

app.use('/delete', delete_router)

app.get('/', async (req, res) => {
    res.send("localhost:2222")
})

app.get('/*', (req, res) => {
    res.status(404).send('not found')
})

module.exports = { app }
