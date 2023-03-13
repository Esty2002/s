require('dotenv').config()
const http = require('http')
const { app } = require('./app')
const { HOST, PORT } = process.env
// const host = '127.0.0.1'
// const port = 5000


app.listen(PORT, HOST, () => {
    console.log(`http://${HOST}:${PORT}`);
})


const server = http.createServer(app)