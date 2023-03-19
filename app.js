const express = require('express')
const app = express()
const cors = require('cors')

const readRouter = require('./routers/read')

const path = require('path')
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/index.html'))
})

app.use('/read', readRouter)

app.get('/*', (req, res) => {
    res.status(404).send('not found')
})


module.exports = { app }
