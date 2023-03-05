const express = require('express')
const app = express()

const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/index.html'))
})


app.get('/*', (req, res) => {
    res.status(404).send('not found')
})

module.exports={app}
