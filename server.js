const http = require('http')
const { app } = require('./app')


const host = '127.0.0.1'
const port = 5000


app.listen(port, host, () => {
    console.log(`http://${host}:${port}`);
})


const server = http.createServer(app)